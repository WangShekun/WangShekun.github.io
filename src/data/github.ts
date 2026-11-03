export const github = {
  username: "WangShekun",
  excludedRepositories: ["WangShekun.github.io"],
  limit: 6,
};

export type Repository = {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  fork: boolean;
  archived: boolean;
  branch?: string;
};

const repositoryHighlights = new Map<string, { branch: string; description?: string }>([
  [
    "idwarp",
    {
      branch: "feature/idwarp-su2-support",
      description:
        "Native SU2 mesh I/O, mesh deformation, and restart-coordinate updates added to IDWarp.",
    },
  ],
  [
    "pygeo",
    {
      branch: "cst3d",
      description:
        "Three-dimensional wing CST parameterization with a DVGeometryCST3D interface for shape, twist, sweep, and dihedral control.",
    },
  ],
]);

export function presentRepository(repository: Repository): Repository {
  return {
    ...repository,
    ...repositoryHighlights.get(repository.name.toLowerCase()),
  };
}

export function repositoryUrl(repository: Repository): string {
  const root = `https://github.com/${github.username}/${repository.name}`;
  return repository.branch
    ? `${root}/tree/${repository.branch.split("/").map(encodeURIComponent).join("/")}`
    : root;
}

type GitHubRepository = {
  name: string;
  owner: { login: string };
  private: false;
  description?: unknown;
  language?: unknown;
  stargazers_count?: unknown;
  fork?: unknown;
  archived?: unknown;
};

// Public metadata checked on 2026-11-03. Also serves readers without JavaScript.
export const repositoryFallback: Repository[] = [
  {
    name: "paraview-su2-reader",
    description:
      "ParaView Python reader plugin for SU2 .su2 mesh files (volume + boundary markers).",
    language: "Python",
    stars: 2,
    fork: false,
    archived: false,
  },
  {
    name: "idwarp",
    description: "IDWarp is a mesh warping package for the MACH framework.",
    language: null,
    stars: 0,
    fork: true,
    archived: false,
  },
  {
    name: "pygeo",
    description:
      "pyGeo provides geometric design variables and constraints suitable for gradient-based optimization.",
    language: null,
    stars: 0,
    fork: true,
    archived: false,
  },
];

const LANGUAGE_COLORS: Record<string, string> = {
  Python: "#3572a5",
  MATLAB: "#e16737",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "C++": "#f34b7d",
  C: "#555555",
  TeX: "#3d6117",
  Shell: "#89e051",
  "Jupyter Notebook": "#da5b0b",
};

export function languageColor(language: string | null): string {
  return (language && LANGUAGE_COLORS[language]) || "#8fa3aa";
}

export function selectRepositories(data: unknown): Repository[] {
  if (!Array.isArray(data))
    throw new Error("Invalid GitHub repository response");
  const excluded = github.excludedRepositories.map((name) =>
    name.toLowerCase(),
  );

  return data
    .filter((value: unknown): value is GitHubRepository => {
      if (!value || typeof value !== "object") return false;
      const repo = value as Record<string, unknown>;
      const owner = repo.owner as { login?: unknown } | null | undefined;
      return (
        typeof repo.name === "string" &&
        /^[a-z0-9_.-]+$/i.test(repo.name) &&
        typeof owner?.login === "string" &&
        owner.login.toLowerCase() === github.username.toLowerCase() &&
        repo.private === false &&
        !excluded.includes(repo.name.toLowerCase())
      );
    })
    .slice(0, github.limit)
    .map((repo) => ({
      name: repo.name,
      description:
        typeof repo.description === "string" ? repo.description : null,
      language: typeof repo.language === "string" ? repo.language : null,
      stars:
        typeof repo.stargazers_count === "number" &&
        Number.isSafeInteger(repo.stargazers_count) &&
        repo.stargazers_count >= 0
          ? repo.stargazers_count
          : 0,
      fork: repo.fork === true,
      archived: repo.archived === true,
    }));
}
