import { type TemplateResult, css, html, nothing } from "lit";
import { tagIcon } from "../icons.ts";

export const topicsStyles = css`
  .topics > span+span {
    margin-left: 0.5em;
  }
`;

export function renderTopics(topics: string[]): TemplateResult {
  return html`
    <div class="topics" part="topics">
      ${topics.length > 0 ? tagIcon : nothing}
      ${topics.map((v) => html`<span>${v}</span>`)}
    </div>
  `;
}
