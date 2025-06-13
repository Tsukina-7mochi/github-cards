import { type TemplateResult, css, html } from "lit";

export const forkSourceStyles = css`
  .fork-source {
    margin: unset;
    font-size: 0.9em;
    color: var(--c-fg-2);
  }
`;

export function renderForkSource(
  url: string | URL,
  name: string
): TemplateResult {
  return html`
    <p class="fork-source">
      fork from <a href="${url.toString()}">${name}</a>
    </p>
  `;
}
