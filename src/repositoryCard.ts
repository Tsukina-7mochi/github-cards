import { css, html, LitElement, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Task } from 'lit/task';
import languageColors from 'github-colors' with { type: 'json' };

import { errorElement } from './errorElement.ts';
import { getRepository } from './lib/ghApi.ts';
import { forkIcon, licenseIcon, starIcon, tagIcon } from './icons.ts';
import { pendingElement } from './pendingElement.ts';

const languageColorElement = function (language: string): TemplateResult {
  const colorCode = languageColors[language]?.color ?? '#808080';
  const color = unsafeCSS(colorCode);

  return html`<span style="display: inline-block; width: 0.9em; height: 0.9em; vertical-align: middle; border-radius: 50%; background-color: ${color};"></span>`;
};

@customElement('gh-repo-card')
export class RepositoryCard extends LitElement {
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

    a#wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.35em;
      color: inherit;
      text-decoration: none;
      color: var(--c-fg);
      line-height: 1.5;
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

    #avatar {
      height: 3.5em;
      border-radius: 4px;
    }

    #description {
      margin: 0;
    }

    #source {
      font-size: 0.9em;
      color: var(--c-fg-2);
    }

    #topics > span {
      margin-right: 0.5em;
    }
  `;

  @property()
  accessor name = '';

  @property({ attribute: 'no-avatar', type: Boolean })
  accessor noAvatar = false;

  @property({ attribute: 'no-description', type: Boolean })
  accessor noDescription = false;

  @property({ attribute: 'no-stars', type: Boolean })
  accessor noStars = false;

  @property({ attribute: 'no-forks', type: Boolean })
  accessor noForks = false;

  @property({ attribute: 'no-license', type: Boolean })
  accessor noLicense = false;

  @property({ attribute: 'no-language', type: Boolean })
  accessor noLanguage = false;

  @property({ attribute: 'no-topics', type: Boolean })
  accessor noTopics = false;

  _fetchTask = new Task(this, {
    task: ([name], { signal }) => {
      if (typeof name !== 'string') {
        return null;
      }

      return getRepository(name, signal);
    },
    args: () => [this.name],
  });

  render() {
    return this._fetchTask.render({
      pending: () => pendingElement,
      error: () => errorElement,
      complete: (repo) => {
        if (repo === null) {
          return errorElement;
        }

        const avatar = html`<img id="avatar" src="${repo.owner.avatar_url}" alt="${repo.owner.login}">`;
        const source = repo.source
          ? html`<div id="source">fork from <a href="${repo.source.html_url}">${repo.source.full_name}</a></div>`
          : null;
        const description = repo.description ? html`<p id="description">${repo.description}</p>` : null;
        const languageColor = repo.language ? languageColorElement(repo.language) : null;
        const language = html`<div id="language">${languageColor} ${repo.language}</div>`;
        const stars = html`<div id="stars">${starIcon} ${repo.stargazers_count}</div>`;
        const forks = html`<div id="forks">${forkIcon} ${repo.forks_count}</div>`;
        const license = repo.license ? html`<div id="license">${licenseIcon} ${repo.license.name}</div>` : null;
        const topicSpans = (repo.topics ?? []).map((v) => html`<span>${v}</span>`);
        const topics = html`<div id="topics">${tagIcon} ${topicSpans}</div>`;

        // TODO: replace emojis in description

        return html`
          <gh-card-base intractable>
            <a id="wrapper" href="${repo.html_url}">
              <header>
                ${this.noAvatar ? null : avatar}
                <div>
                  <h2>${repo.name}</h2>
                  ${source}
                  ${this.noDescription ? null : description}
                </div>
              </header>
              <div>
                ${this.noLanguage ? null : language}
                ${this.noStars ? null : stars}
                ${this.noForks ? null : forks}
                ${this.noLicense ? null : license}
              </div>
              ${this.noTopics ? null : topics}
            </a>
          </gh-card-base>
        `;
      },
    });
  }
}
