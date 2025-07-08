import { type TemplateResult, css, html } from "lit";

import { styleMap } from "lit/directives/style-map.js";
import colorMap from "./languageColors.json" with { type: "json" };

export const languageStyles = css`
  .language-color {
    display: inline-block;
    width: 0.9em;
    height: 0.9em;
    vertical-align: middle;
    border-radius: 50%;
  }
`;

const renderLanguageColor = function (language: string): TemplateResult {
  const colorCode =
    colorMap[language as keyof typeof colorMap]?.color ?? "#808080";

  return html`
    <span class="language-color" part="language-color" style=${styleMap({ backgroundColor: colorCode })}></span>
  `;
};

export function renderLanguage(language: string): TemplateResult {
  return html`
    <div class="language" part="language">${renderLanguageColor(language)} ${language}</div>
  `;
}
