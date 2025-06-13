import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { avatarStyles, renderAvatar } from "./repositoryCard/avatar.ts";
import { nameStyles, renderName } from "./repositoryCard/name.ts";
import { renderForks } from "./repositoryCard/forks.ts";
import {
  forkSourceStyles,
  renderForkSource,
} from "./repositoryCard/forkSource.ts";
import {
  descriptionStyles,
  renderDescription,
} from "./repositoryCard/description.ts";
import { languageStyles, renderLanguage } from "./repositoryCard/language.ts";
import { renderStars } from "./repositoryCard/stars.ts";
import { renderLicense } from "./repositoryCard/license.ts";
import { renderTopics, topicsStyles } from "./repositoryCard/topics.ts";

const arrayEquals = function (oldVar: string[], newVar: string[]) {
  if (!(Array.isArray(oldVar) && Array.isArray(newVar))) return false;
  if (oldVar.length !== newVar.length) return false;

  for (let i = 0; i < oldVar.length; i++) {
    if (oldVar[i] !== newVar[i]) return false;
  }
  return true;
};

@customElement("gh-repo-card-display")
export class RepositoryCardDisplay extends LitElement {
  static styles = [
    avatarStyles,
    nameStyles,
    forkSourceStyles,
    descriptionStyles,
    languageStyles,
    topicsStyles,
    css`
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

    .row {
      display: flex;
      gap: 1em;
      align-items: center;
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 0.25em;
    }
  `,
  ];

  @property({ type: String })
  accessor name = "";

  @property({ type: String })
  accessor url = "";

  @property({ type: String })
  accessor owner = "";

  @property({ type: String, attribute: "avatar-url" })
  accessor avatarUrl: string | null = null;

  @property({ type: Object, attribute: "fork-source" })
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
      if (typeof value !== "string") {
        return null;
      }
      return value
        .trim()
        .split(" ")
        .filter((v) => v.length > 0);
    },
    hasChanged: arrayEquals,
  })
  accessor topics: string[] = [];

  render() {
    const avatar = this.avatarUrl
      ? renderAvatar(this.avatarUrl, this.owner)
      : nothing;
    const repoName = renderName(this.name);
    const forkSource =
      this.forkSource !== null
        ? renderForkSource(this.forkSource.html_url, this.forkSource.full_name)
        : nothing;
    const description =
      this.description !== null ? renderDescription(this.description) : nothing;
    const language =
      this.language !== null ? renderLanguage(this.language) : nothing;
    const stars = this.stars !== null ? renderStars(this.stars) : nothing;
    const forks = this.forks !== null ? renderForks(this.forks) : nothing;
    const license =
      this.license !== null ? renderLicense(this.license) : nothing;
    const topics = renderTopics(this.topics);

    // TODO: replace emojis in description

    return html`
      <gh-card-base intractable>
        <a class="column wrapper" href="${this.url}">
          <div class="row">
            ${avatar}
            <div class="column">
              ${repoName}
              ${forkSource}
              ${description}
            </div>
          </div>
          <div class="row">
            ${language}
            ${stars}
            ${forks}
            ${license}
          </div>
          <div class="row">
            ${topics}
          </div>
        </a>
      </gh-card-base>
    `;
  }
}
