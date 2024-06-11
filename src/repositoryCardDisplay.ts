import { css, html, LitElement, nothing, TemplateResult, unsafeCSS } from 'lit';
import { map } from 'lit/directives/map.js';
import { customElement, property } from 'lit/decorators.js';
import languageColors from 'github-colors' with { type: 'json' };

import { forkIcon, licenseIcon, starIcon, tagIcon } from './icons.ts';

const arrayEquals = function (oldVar: string[], newVar: string[]) {
  if (!(Array.isArray(oldVar) && Array.isArray(newVar))) return false;
  if (oldVar.length !== newVar.length) return false;

  for (let i = 0; i < oldVar.length; i++) {
    if (oldVar[i] !== newVar[i]) return false;
  }
  return true;
};

const languageColorElement = function (language: string): TemplateResult {
  const colorCode = languageColors[language]?.color ?? '#808080';
  const color = unsafeCSS(colorCode);

  return html`<span style="display: inline-block; width: 0.9em; height: 0.9em; vertical-align: middle; border-radius: 50%; background-color: ${color};"></span>`;
};

@customElement('gh-repo-card-display')
export class RepositoryCardDisplay extends LitElement {
  static styles = css`
    :host {
      font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;

      --c-fg: var(--gh-card-color-fg, #404040);
      --c-fg-2: var(--gh-card-color-fg-2, #808080);
      --c-link: var(--gh-card-color-link, #646cff);
    }

    gh-card::part(wrapper) {
      padding: 0;
    }

    svg.icon {
      width: 1em;
      height: 1em;
      vertical-align: middle;
      fill: var(--c-fg);
    }

    a {
      color: #646cff;
    }

    a.wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.35em;
      color: inherit;
      text-decoration: none;
      color: var(--c-fg);
      line-height: 1.5;
      text-indent: 0;
      overflow: hidden;
    }

    h2 {
      margin: 0;
      font-weight: bold;
      font-size: 1.2em;
      color: var(--c-link);
    }

    header {
      display: flex;
      align-items: center;
      gap: 1em;
    }

    header+div {
      display: flex;
      gap: 1em;
    }

    img.avatar {
      height: 3.5em;
      border-radius: 4px;
    }

    p.description {
      margin: 0;
      overflow-wrap: anywhere;
    }

    div.source {
      font-size: 0.9em;
      color: var(--c-fg-2);
    }

    div.topics > span {
      margin-right: 0.5em;
    }
  `;

  @property({ type: String })
  accessor name: string = '';

  @property({ type: String })
  accessor url: string = '';

  @property({ type: String })
  accessor owner: string = '';

  @property({ type: String, attribute: 'avatar-url' })
  accessor avatarUrl: string | null = null;

  @property({ type: Object, attribute: 'fork-source' })
  accessor forkSource: { html_url: string; full_name: string } | null = null;

  @property({ type: String })
  accessor description: string | null = null;

  @property({ type: Number })
  accessor stars: number | null = null;

  @property({ type: Number })
  accessor forks: number | null = null;

  @property({ type: String })
  accessor license: string | null = null;

  @property({ type: String })
  accessor language: string | null = null;

  @property({
    converter(value) {
      if (typeof value !== 'string') {
        return null;
      }
      return value.trim().split(' ').filter((v) => v.length > 0);
    },
    hasChanged: arrayEquals,
  })
  accessor topics: string[] = [];

  render() {
    const avatar = this.avatarUrl !== null
      ? html`<img class="avatar" src="${this.avatarUrl}" alt="${this.owner}">`
      : nothing;
    const forkSource = this.forkSource !== null
      ? html`<div class="source">fork from <a href="${this.forkSource.html_url}">${this.forkSource.full_name}</a></div>`
      : nothing;
    const description = this.description !== null ? html`<p class="description">${this.description}</p>` : nothing;
    const language = this.language !== null
      ? html`<div class="language">${languageColorElement(this.language)} ${this.language}</div>`
      : nothing;
    const stars = this.stars !== null ? html`<div class="stars">${starIcon} ${this.stars}</div>` : nothing;
    const forks = this.forks !== null ? html`<div class="forks">${forkIcon} ${this.forks}</div>` : nothing;
    const license = this.license !== null ? html`<div class="license">${licenseIcon} ${this.license}</div>` : nothing;
    const topicSpans = html`${map(this.topics, (topic) => html`<span>${topic}</span>`)}`;
    const topicIcon = this.topics.length > 0 ? tagIcon : nothing;

    // TODO: replace emojis in description

    return html`
      <gh-card-base intractable>
        <a class="wrapper" href="${this.url}">
          <header>
            ${avatar}
            <div>
              <h2>${this.name}</h2>
              ${forkSource}
              ${description}
            </div>
          </header>
          <div>
            ${language}
            ${stars}
            ${forks}
            ${license}
          </div>
          <div class="topics">
            ${topicIcon}
            ${topicSpans}
          </div>
        </a>
      </gh-card-base>
    `;
  }
}
