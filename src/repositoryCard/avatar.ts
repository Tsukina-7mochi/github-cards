import { type TemplateResult, css, html } from "lit";

export const avatarStyles = css`
  .avatar {
    height: var(--size-avatar);
    border-radius: var(--radius);
  }
`;

export function renderAvatar(
  imageUrl: string | URL,
  userName: string
): TemplateResult {
  return html`
    <img
      class="avatar"
      part="avatar"
      src="${imageUrl.toString()}"
      alt="Avatar of repository owner @${userName}"
    >
  `;
}
