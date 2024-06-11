import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Task } from 'lit/task';
import { ifDefined } from 'lit/directives/if-defined.js';

import { errorElement } from './errorElement.ts';
import { getRepository } from './lib/ghApi.ts';
import { pendingElement } from './pendingElement.ts';

@customElement('gh-repo-card')
export class RepositoryCard extends LitElement {
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

        const avatarUrl = this.noAvatar ? null : repo.owner.avatar_url;
        const description = this.noDescription ? null : repo.description;
        const stars = this.noStars ? null : repo.stargazers_count;
        const forks = this.noForks ? null : repo.forks_count;
        const license = this.noLicense ? null : repo.license?.name;
        const language = this.noLanguage ? null : repo.language;
        const topics = this.noTopics ? [] : (repo.topics ?? []);

        return html`
          <gh-repo-card-display
            name="${repo.name}"
            url="${repo.html_url}"
            owner="${repo.owner.login}"
            avatar-url="${ifDefined(avatarUrl)}"
            fork-source="${ifDefined(repo.source)}"
            description="${ifDefined(description)}"
            stars="${ifDefined(stars)}"
            forks="${ifDefined(forks)}"
            license="${ifDefined(license)}"
            language="${ifDefined(language)}"
            topics="${topics.join(' ')}"
          ></gh-repo-card-display>
        `;
      },
    });
  }
}
