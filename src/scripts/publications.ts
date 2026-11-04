const section = document.querySelector<HTMLElement>("#publications");
const tabList = section?.querySelector<HTMLElement>(".publication-tabs");
const viewport = section?.querySelector<HTMLElement>(".publication-panels");
const track = section?.querySelector<HTMLElement>(".publication-track");
const tabs = Array.from(tabList?.querySelectorAll<HTMLButtonElement>("[role='tab']") ?? []);
const panels = Array.from(track?.querySelectorAll<HTMLElement>(".publication-group") ?? []);

if (section && tabList && viewport && track && tabs.length === panels.length && tabs.length) {
  let activeIndex = 0;
  let printing = false;

  const updateHeight = () => {
    if (!printing) viewport.style.height = `${panels[activeIndex].getBoundingClientRect().height}px`;
  };

  const updatePanelAccess = () => {
    panels.forEach((panel, index) => {
      const visible = printing || index === activeIndex;
      panel.inert = !visible;
      panel.setAttribute("aria-hidden", String(!visible));
      panel.tabIndex = visible ? 0 : -1;
      panel.querySelector(".publication-group-title")?.classList.toggle("sr-only", !printing);
    });
  };

  const selectTab = (index: number, updateHash = false) => {
    activeIndex = index;
    tabs.forEach((tab, tabIndex) => {
      tab.setAttribute("aria-selected", String(tabIndex === index));
      tab.tabIndex = tabIndex === index ? 0 : -1;
    });
    updatePanelAccess();
    track.style.transform = `translateX(${-100 * index}%)`;
    viewport.scrollLeft = 0;
    updateHeight();
    if (updateHash) history.replaceState(history.state, "", `#${panels[index].id}`);
  };

  panels.forEach((panel, index) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabs[index].id);
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(index, true));
    tab.addEventListener("keydown", (event) => {
      let nextIndex: number;
      switch (event.key) {
        case "ArrowRight": nextIndex = (index + 1) % tabs.length; break;
        case "ArrowLeft": nextIndex = (index - 1 + tabs.length) % tabs.length; break;
        case "Home": nextIndex = 0; break;
        case "End": nextIndex = tabs.length - 1; break;
        default: return;
      }
      event.preventDefault();
      event.stopPropagation();
      selectTab(nextIndex, true);
      tabs[nextIndex].focus({ preventScroll: true });
    });
  });

  const selectFromHash = () => {
    const index = panels.findIndex((panel) => `#${panel.id}` === window.location.hash);
    if (index !== -1) selectTab(index);
  };

  tabList.hidden = false;
  section.classList.add("has-tabs");
  selectTab(0);
  selectFromHash();
  window.addEventListener("hashchange", selectFromHash);

  const observer = new ResizeObserver(updateHeight);
  panels.forEach((panel) => observer.observe(panel));

  window.addEventListener("beforeprint", () => {
    printing = true;
    updatePanelAccess();
  });
  window.addEventListener("afterprint", () => {
    printing = false;
    updatePanelAccess();
    updateHeight();
  });
}

export {};
