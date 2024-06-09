import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('gh-card-base')
export class CardBase extends LitElement {
  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;

      --c-border: var(--gh-card-color-border, #c0c0c0);
      --c-bg-hover: var(--gh-card-color-background-hover, rgb(0 0 0 / 3%));
      --c-bg-active: var(--gh-card-color-background-active, rgb(0 0 0 / 5%));
    }

    article {
      border: 1px solid var(--c-border);
      border-radius: 4px;
      line-height: 1.5;
    }

    article.interactable:hover {
      background-color: var(--c-bg-hover);
    }

    article.interactable:active {
      background-color: var(--c-bg-active);
    }

    ::slotted(*) {
      padding: 1em 2em;
    }
  `;

  @property({ type: Boolean })
  accessor interactable = false;

  render() {
    const className = this.interactable ? 'interactable' : null;
    return html`<article class="${className}"><slot></slot></article>`;
  }
}
