import { type TemplateResult, css, html } from "lit";

export const nameStyles = css`
  .repo-name {
    font-weight: bold;
    font-size: 1.2em;
    color: var(--color-text-link);
  }
`;

export function renderName(name: string): TemplateResult {
  return html`<div class="repo-name" part="repo-name">${name}</div>`;
}
