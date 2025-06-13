import { type TemplateResult, html } from "lit";
import { forkIcon } from "../icons.ts";

export function renderForks(count: number): TemplateResult {
  return html`<div class="forks">${forkIcon} ${count}</div>`;
}
