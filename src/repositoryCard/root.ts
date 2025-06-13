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

    --color-background: #ffffff;
    --color-background-hover: #f0f0f0;
    --color-background-active: #e0e0e0;
    --color-text-primary: #404040;
    --color-text-secondary: #808080;
    --color-text-link: #646cff;
    --color-border: #c0c0c0;

    --radius: 4px;

    --size-avatar: 3.5em;
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --color-background: #202020;
      --color-background-hover: #303030;
      --color-background-active: #3a3a3a;
      --color-text-primary: #ffffff;
      --color-text-secondary: #808080;
      --color-border: #303030;
    }
  }

  :is(svg, img).icon {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: var(--color-text-primary);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.35em;
    padding: 1em 2em;

    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    color: var(--color-text-primary);
    line-height: 1.5;
    text-decoration: unset;
    text-indent: 0;

    &:hover {
      background-color: var(--color-background-hover);
    }

    &:active {
      background-color: var(--color-background-active);
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
