import { browser } from "webextension-polyfill-ts";

export const isBadgeSelected = (badgeKey: string): Promise<boolean> => {
  return new Promise((res, rej) => {
    browser.storage.sync
      .get(badgeKey)
      .then((result) => res(!!result[badgeKey]))
      .catch(rej);
  });
};
