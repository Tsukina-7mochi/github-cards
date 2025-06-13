import { type TemplateResult, css, html, nothing } from "lit";

type OptionalTemplate = TemplateResult | typeof nothing;

type RootInit = {
  url: string | URL;
  avatar: OptionalTemplate;
  repoName: TemplateResult;
  forkSource: OptionalTemplate;
  description: OptionalTemplate;
  language: OptionalTemplate;
  stars: OptionalTemplate;
  forks: OptionalTemplate;
  license: OptionalTemplate;
  topics: OptionalTemplate;
};

export const rootStyles = css`
  :host {
    display: block;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;

    --c-border: #c0c0c0;
    --c-bg-hover: rgb(0 0 0 / 3%);
    --c-bg-active: rgb(0 0 0 / 5%);
    --c-fg: #404040;
    --c-fg-2: #808080;
    --c-link: #646cff;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --c-fg: #D0D0D0;
    }
  }

  :is(svg, img).icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: var(--c-fg);
  }

  .wrapper {
    border: 1px solid var(--c-border);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 0.35em;

    color: unset;
    text-decoration: none;
    color: var(--c-fg);
    line-height: 1.5;
    text-indent: 0;
    overflow: hidden;
    padding: 1em 2em;

    &:hover {
      background-color: var(--c-bg-hover);
    }

    &:active {
      background-color: var(--c-bg-active);
    }
  }

  .row {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: 0.25em;
    width: 100%;
  }
`;

export function renderRoot(init: RootInit) {
  let statRow: TemplateResult | typeof nothing = nothing;
  if (
    init.language !== nothing ||
    init.stars !== nothing ||
    init.forks !== nothing ||
    init.license !== nothing
  ) {
    statRow = html`
      <div class="row">
        ${init.language}
        ${init.stars}
        ${init.forks}
        ${init.license}
      </div>
    `;
  }

  let topicsRow: TemplateResult | typeof nothing = init.topics;
  if (init.topics !== nothing) {
    topicsRow = html`
      <div class="row">
        ${init.topics}
      </div>
    `;
  }

  return html`
    <a class="column wrapper" href="${init.url}">
      <div class="row">
        ${init.avatar}
        <div class="column">
          ${init.repoName}
          ${init.forkSource}
          ${init.description}
        </div>
      </div>
      ${statRow}
      ${topicsRow}
    </a>
  `;
}
