import { type TemplateResult, css, html, unsafeCSS } from "lit";

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
  const color = unsafeCSS(colorCode);

  return html`
    <span class="language-color" style="background-color: ${color};"></span>
  `;
};

export function renderLanguage(language: string): TemplateResult {
  return html`
    <div class="language">${renderLanguageColor(language)} ${language}</div>
  `;
}
