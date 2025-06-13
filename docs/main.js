function setupRepositoryCard() {
  const repositoryCard = document.getElementById("repository-card");
  const controller = document.getElementById("repository-card-controller");

  if (!repositoryCard) throw new Error("Repository card not found");
  if (!controller) throw new Error("Controller not found");

  const repoName = controller.querySelector("input[name='repo-name']");
  repoName?.addEventListener("change", (e) => {
    const value = e.target.value;
    repositoryCard.setAttribute("name", value);
  });

  const noAvatar = controller.querySelector("input[name='no-avatar']");
  noAvatar?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-avatar", "");
    } else {
      repositoryCard.removeAttribute("no-avatar");
    }
  });

  const noForkSource = controller.querySelector("input[name='no-fork-source']");
  noForkSource?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-fork-source", "");
    } else {
      repositoryCard.removeAttribute("no-fork-source");
    }
  });

  const noDescription = controller.querySelector(
    "input[name='no-description']"
  );
  noDescription?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-description", "");
    } else {
      repositoryCard.removeAttribute("no-description");
    }
  });

  const noLanguage = controller.querySelector("input[name='no-language']");
  noLanguage?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-language", "");
    } else {
      repositoryCard.removeAttribute("no-language");
    }
  });

  const noStars = controller.querySelector("input[name='no-stars']");
  noStars?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-stars", "");
    } else {
      repositoryCard.removeAttribute("no-stars");
    }
  });

  const noForks = controller.querySelector("input[name='no-forks']");
  noForks?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-forks", "");
    } else {
      repositoryCard.removeAttribute("no-forks");
    }
  });

  const noLicense = controller.querySelector("input[name='no-license']");
  noLicense?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-license", "");
    } else {
      repositoryCard.removeAttribute("no-license");
    }
  });

  const noTopics = controller.querySelector("input[name='no-topics']");
  noTopics?.addEventListener("change", (e) => {
    const value = e.target.checked;
    if (value) {
      repositoryCard.setAttribute("no-topics", "");
    } else {
      repositoryCard.removeAttribute("no-topics");
    }
  });
}

function main() {
  setupRepositoryCard();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
