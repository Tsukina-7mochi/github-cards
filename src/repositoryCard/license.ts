import { html } from "lit";
import { licenseIcon } from "../icons.ts";

export function renderLicense(name: string) {
  return html`<div class="license">${licenseIcon} ${name}</div>`;
}
