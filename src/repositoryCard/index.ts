import { Task } from "@lit/task";
import { LitElement, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import { errorElement } from "../errorElement.ts";
import { getRepository } from "../lib/ghApi.ts";
import { pendingElement } from "../pendingElement.ts";
import { avatarStyles, renderAvatar } from "./avatar.ts";
import { descriptionStyles, renderDescription } from "./description.ts";
import { forkSourceStyles, renderForkSource } from "./forkSource.ts";
import { renderForks } from "./forks.ts";
import { languageStyles, renderLanguage } from "./language.ts";
import { renderLicense } from "./license.ts";
import { nameStyles, renderName } from "./name.ts";
import { renderRoot, rootStyles } from "./root.ts";
import { renderStars } from "./stars.ts";
import { renderTopics, topicsStyles } from "./topics.ts";

@customElement("gh-repo-card")
export class RepositoryCard extends LitElement {
  static styles = [
    rootStyles,
    avatarStyles,
    nameStyles,
    forkSourceStyles,
    descriptionStyles,
    languageStyles,
    topicsStyles,
  ];

  @property()
  accessor name = "";

  @property({ attribute: "no-avatar", type: Boolean })
  accessor noAvatar = false;

  @property({ attribute: "no-fork-source", type: Boolean })
  accessor noForkSource = false;

  @property({ attribute: "no-description", type: Boolean })
  accessor noDescription = false;

  @property({ attribute: "no-stars", type: Boolean })
  accessor noStars = false;

  @property({ attribute: "no-forks", type: Boolean })
  accessor noForks = false;

  @property({ attribute: "no-license", type: Boolean })
  accessor noLicense = false;

  @property({ attribute: "no-language", type: Boolean })
  accessor noLanguage = false;

  @property({ attribute: "no-topics", type: Boolean })
  accessor noTopics = false;

  _fetchTask = new Task(this, {
    task: ([name], { signal }) => {
      if (typeof name !== "string") {
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

        const avatar =
          !this.noAvatar && repo.owner.avatar_url
            ? renderAvatar(repo.owner.avatar_url, repo.owner.login)
            : nothing;
        const repoName = renderName(this.name);
        const forkSource =
          !this.noForkSource && repo.source
            ? renderForkSource(repo.source.html_url, repo.source.full_name)
            : nothing;
        const description =
          !this.noDescription && repo.description
            ? renderDescription(repo.description)
            : nothing;
        const language =
          !this.noLanguage && repo.language
            ? renderLanguage(repo.language)
            : nothing;
        const stars = !this.noStars
          ? renderStars(repo.stargazers_count)
          : nothing;
        const forks = !this.noForks ? renderForks(repo.forks_count) : nothing;
        const license =
          !this.noLicense && repo.license
            ? renderLicense(repo.license.name)
            : nothing;
        const topics =
          !this.noTopics && repo.topics ? renderTopics(repo.topics) : nothing;

        return renderRoot({
          url: repo.html_url,
          avatar,
          repoName,
          forkSource,
          description,
          language,
          stars,
          forks,
          license,
          topics,
        });
      },
    });
  }
}
