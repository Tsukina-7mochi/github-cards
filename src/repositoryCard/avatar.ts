import { type TemplateResult, css, html } from "lit";

export const avatarStyles = css`
  .avatar {
    height: 3.5em;
    border-radius: 4px;
  }
`;

export function renderAvatar(
  imageUrl: string | URL,
  userName: string
): TemplateResult {
  return html`
    <img
      class="avatar"
      src="${imageUrl.toString()}"
      alt="Avatar of repository owner @${userName}"
    >
  `;
}
