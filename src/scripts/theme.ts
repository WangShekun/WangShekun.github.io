type Theme = "light" | "dark";

const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

const savedTheme = (): Theme | null => {
  try {
    const value = localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
};

let preference = savedTheme();

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;
  toggle?.setAttribute("aria-label", label);
  toggle?.setAttribute("title", label);
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    "content", theme === "dark" ? "#18232b" : "#f2f1ec",
  );
};

applyTheme(preference ?? (systemTheme.matches ? "dark" : "light"));
if (toggle) toggle.hidden = false;

toggle?.addEventListener("click", () => {
  preference = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(preference);
  try { localStorage.setItem("theme", preference); } catch {}
});

systemTheme.addEventListener("change", () => {
  if (!preference) applyTheme(systemTheme.matches ? "dark" : "light");
});

window.addEventListener("storage", (event) => {
  if (event.key !== "theme" && event.key !== null) return;
  preference = savedTheme();
  applyTheme(preference ?? (systemTheme.matches ? "dark" : "light"));
});
