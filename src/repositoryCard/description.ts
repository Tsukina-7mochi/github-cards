import { type TemplateResult, css, html } from "lit";

export const descriptionStyles = css`
  .description {
    margin: unset;
    overflow-wrap: anywhere;
  }
`;

export function renderDescription(description: string): TemplateResult {
  return html`<p class="description">${description}</p>`;
}
