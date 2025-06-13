import { type TemplateResult, html } from "lit";
import { starIcon } from "../icons.ts";

export function renderStars(count: number): TemplateResult {
  return html`<div class="stars">${starIcon} ${count}</div>`;
}
