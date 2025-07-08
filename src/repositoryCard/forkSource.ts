import { type TemplateResult, css, html } from "lit";

export const forkSourceStyles = css`
  .fork-source {
    margin: unset;
    font-size: 0.9em;
    color: var(--color-text-secondary);

    a {
      color: var(--color-text-link);
    }
  }
`;

export function renderForkSource(
  url: string | URL,
  name: string
): TemplateResult {
  return html`
    <p class="fork-source" part="fork-source">
      fork from <a href="${url.toString()}">${name}</a>
    </p>
  `;
}
