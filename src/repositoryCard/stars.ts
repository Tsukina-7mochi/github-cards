import { type TemplateResult, html } from "lit";
import { starIcon } from "../icons.ts";

export function renderStars(count: number): TemplateResult {
  return html`<div class="stars" part="stars">${starIcon} ${count}</div>`;
}
