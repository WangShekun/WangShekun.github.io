import {
  github,
  languageColor,
  presentRepository,
  repositoryUrl,
  selectRepositories,
} from "../data/github";

async function refreshRepositories() {
  const list = document.querySelector<HTMLUListElement>("[data-repositories]");
  const template = document.querySelector<HTMLTemplateElement>(
    "[data-repository-template]",
  );
  if (!list || !template) return;

  try {
    const response = await fetch(
      `https://api.github.com/users/${github.username}/repos?type=owner&sort=updated&per_page=100`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(6000),
      },
    );
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const repositories = selectRepositories(await response.json());
    // Do not replace a link while a visitor is interacting with it.
    if (list.contains(document.activeElement)) return;

    const fragment = document.createDocumentFragment();
    for (const repository of repositories) {
      const repo = presentRepository(repository);
      const card = template.content.cloneNode(true) as DocumentFragment;
      const link = card.querySelector<HTMLAnchorElement>("a")!;
      link.href = repositoryUrl(repo);
      card.querySelector("[data-repo-name]")!.textContent = repo.name;
      const description = card.querySelector<HTMLElement>(
        "[data-repo-description]",
      )!;
      description.textContent = repo.description;
      description.hidden = !repo.description;
      const language = card.querySelector<HTMLElement>("[data-repo-language]")!;
      language.hidden = !repo.language;
      card.querySelector<HTMLElement>("[data-repo-language-text]")!
        .textContent = repo.language;
      card.querySelector<HTMLElement>("[data-repo-language-dot]")!.style.background =
        languageColor(repo.language);
      card.querySelector<HTMLElement>("[data-repo-fork]")!.hidden = !repo.fork;
      card.querySelector<HTMLElement>("[data-repo-archived]")!.hidden =
        !repo.archived;
      const branch = card.querySelector<HTMLElement>("[data-repo-branch]")!;
      branch.textContent = repo.branch ? `Branch: ${repo.branch}` : "";
      branch.hidden = !repo.branch;
      card.querySelector<HTMLElement>("[data-repo-stars]")!.hidden =
        repo.stars === 0;
      card.querySelector("[data-repo-star-count]")!.textContent = String(
        repo.stars,
      );
      fragment.append(card);
    }
    list.replaceChildren(fragment);
  } catch (error) {
    // The static cards remain usable offline, on timeout, or after rate limiting.
    console.warn(
      "GitHub projects could not refresh; showing the saved list.",
      error,
    );
  }
}

void refreshRepositories();
