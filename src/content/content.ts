import { badgesList } from "../data/badgesList";
import { getAllSelectedBadges } from "../utils/getAllSelectedBadges";

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

      getAllSelectedBadges().then((selectedBadgeKeys) => {
        const allItems = Object.values(badgesList);

        const selectedBadges = allItems.reduce((acc, each) => {
          const badgeKeys = Object.keys(each);

          const selectedKeys = badgeKeys.filter(
            (each) => selectedBadgeKeys.indexOf(each) > -1
          );

          // @ts-ignore
          const badges = selectedKeys.map((selectedKey) => each[selectedKey]);

          acc = [...acc, ...badges];

          return acc;
        }, [] as { name: string; url: string }[]);

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
      });
    }, 1000);
  }
};

/**
 * User moves through the page with back / forward button
 */
window.addEventListener("popstate", function () {
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

/**
 * Page has loaded for the first time
 */
if (window.document.readyState === "loading") {
  window.document.addEventListener("DOMContentLoaded", () => {
    applyBadges();
  });
} else {
  applyBadges();
}
