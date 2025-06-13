import { css, html, nothing } from "lit";
import { type StyleInfo, styleMap } from "lit/directives/style-map.js";

export const skeletonStyles = css`
  .skeleton {
    display: inline-block;
    width: 100%;
    height: 1em;
    border-radius: 4px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }

  /* Keyframes for the loading animation */
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export function renderSkeleton(
  content: unknown = nothing,
  styles: StyleInfo = {}
) {
  return html`<div class="skeleton" style=${styleMap(styles)}>${content}</div>`;
}

export function renderSkeletonBlock(
  content: unknown = nothing,
  styles: StyleInfo = {}
) {
  return renderSkeleton(content, {
    display: "block",
    ...styles,
  });
}
