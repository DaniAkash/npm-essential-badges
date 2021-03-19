import { badgesList } from "../data/badgesList";

const applyBadges = () => {
  const $title = window.document.querySelector("span[title]");
  if ($title) {
    const badges = window.document.querySelectorAll("#essential-badges");
    if (badges) {
      badges.forEach((item) => item.remove());
    }
    setTimeout(() => {
      const packageName = $title.textContent;
      const $h2Tag = $title.parentElement;
      const $divTag = $h2Tag?.parentElement;

      const selectedItems = Object.values(badgesList);

      const selectedBadges = selectedItems.reduce((acc, each) => {
        const newArray = Object.values(each);
        acc = [...acc, ...newArray.filter((each) => each.isSelected)];
        return acc;
      }, [] as { name: string; url: string; isSelected: boolean }[]);

      $divTag?.insertAdjacentHTML(
        "afterbegin",
        `
        <div id="essential-badges">
          ${selectedBadges
            .map((each) => {
              return `<img
            src="${each.url.replace(":packageName", packageName || "")}"
            style="padding-left: 8px;padding-top: 5px;"
          />`;
            })
            .join("")}
        </div>
        `
      );
    }, 1000);
  }
};

window.addEventListener("popstate", function (event) {
  applyBadges();
});

/**
 * TODO: Look for a effective way to detect page changes inside NPM Site
 *
 * Right now using click + timeouts which is quite inaccurate
 */
window.addEventListener("click", (event) => {
  if (event.target) {
    // @ts-ignore
    if (event.target.tagName === "A") {
      // Timeout to ensure enough time is given for page to load...
      setTimeout(() => {
        applyBadges();
      }, 3000);
    }
    // TODO: Handle clicking on dropdown from search bar...
    // event.target.tagName === "P";
  }
});

if (window.document.readyState === "loading") {
  window.document.addEventListener("DOMContentLoaded", () => {
    applyBadges();
  });
} else {
  applyBadges();
}
