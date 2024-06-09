const cache_ = globalThis.caches.open('gh-cards-v1');

const ensureCacheTTL = async function (): Promise<void> {
  const cache = await cache_;

  const lastUpdate = localStorage.getItem('gh-cards-v1');
  if (typeof lastUpdate === 'string') {
    if (parseInt(lastUpdate) < Date.now() - 86_400_000) {
      // It is not accurate that all caches have the same TTL,
      // but it makes sense in terms of guaranteeing
      // a minimum of novelty and eliminating duplicate requests

      // Refresh cache here
      await Promise.all((await cache.keys()).map((key) => cache.delete(key)));
      localStorage.setItem('gh-cards-v1', Date.now().toString());
    }
  }
};

const getCachedResponse = async function (url: string | URL): Promise<Response | null> {
  const cache = await cache_;
  const match = await cache.match(url);
  return match ?? null;
};

const fetchAndPutCache = async function (url: string | URL, requestInit: RequestInit): Promise<Response> {
  const cache = await cache_;
  const res = await fetch(url, requestInit);

  if (res.ok) {
    cache.put(url, res.clone());
  }
  return res;
};

export const cachedFetchInternal = async function (
  url: string | URL,
  requestInit: RequestInit,
): Promise<Response> {
  await ensureCacheTTL();
  const cached = await getCachedResponse(url);

  if (cached !== null) {
    return cached;
  }

  return fetchAndPutCache(url, requestInit);
};

export const cachedFetch = async function (
  url: string | URL,
  requestInit: RequestInit,
): Promise<Response> {
  if (!navigator.locks) {
    return cachedFetchInternal(url, requestInit);
  }

  // Obtain a lock corresponding to a URL to
  // wait other task that fetching the same URL

  // We can reduce latency at the expense of simplicity
  // by doing an early return only if there is a cache available
  const lockName = `gh-cards-${url.toString()}`;
  return await navigator.locks.request(
    lockName,
    { signal: requestInit.signal ?? undefined },
    () => {
      return cachedFetchInternal(url, requestInit);
    },
  );
};
