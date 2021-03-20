import { browser } from "webextension-polyfill-ts";
import { badgesList } from "../data/badgesList";

export const getAllSelectedBadges = (): Promise<string[]> => {
  return new Promise((res, rej) => {
    const sections = Object.keys(badgesList);

    const badgeKeys = sections
      .map((sectionKey) =>
        // @ts-ignore
        Object.keys(badgesList[sectionKey])
      )
      .flat();

    const selectedBadgeData = badgeKeys.map((key) => {
      return browser.storage.sync.get(key);
    });

    Promise.all(selectedBadgeData)
      .then((result) => {
        const selectedBadges: string[] = [];
        result.forEach((item) => {
          if (Object.keys(item).length) {
            selectedBadges.push(Object.keys(item)[0]);
          }
        });
        res(selectedBadges);
      })
      .catch(rej);
  });
};
