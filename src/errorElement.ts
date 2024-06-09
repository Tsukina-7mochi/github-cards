import { html } from 'lit';

export const errorElement = (message?: string) => {
  const content = typeof message === 'string' ? `Error: ${message}` : 'Error';
  return html`<gh-card-base>${content}</gh-card-base>`;
};
