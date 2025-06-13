import { type TemplateResult, css, html } from "lit";

export const nameStyles = css`
  .repo-name {
    font-weight: bold;
    font-size: 1.2em;
    color: var(--c-link);
  }
`;

export function renderName(name: string): TemplateResult {
  return html`<div class="repo-name">${name}</div>`;
}
