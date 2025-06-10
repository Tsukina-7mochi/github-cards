import { cachedFetch } from "./cachedFetch.ts";

export type GitHubEmojis = Record<string, string>;

export type GitHubRepository = {
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description?: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  license?: {
    name: string;
  };
  topics?: string[];
  source?: {
    full_name: string;
    html_url: string;
  };
};

export const getEmojis = async function (
  signal: AbortSignal
): Promise<GitHubEmojis> {
  const res = await cachedFetch("https://api.github.com/emojis", { signal });
  if (!res.ok) {
    throw Error("Failed to get GitHub emojis");
  }
  return (await res.json()) as GitHubEmojis;
};

export const getRepository = async function (
  name: string,
  signal: AbortSignal
): Promise<GitHubRepository> {
  const res = await cachedFetch(`https://api.github.com/repos/${name}`, {
    signal,
  });
  if (!res.ok) {
    throw Error(`Failed to fetch repository data: ${res.status}`);
  }
  return (await res.json()) as GitHubRepository;
};
