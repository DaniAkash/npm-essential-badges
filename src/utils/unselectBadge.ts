import { browser } from "webextension-polyfill-ts";

export const unselectBadge = (badgeKey: string): Promise<void> => {
  return new Promise((res, rej) => {
    browser.storage.sync
      .remove(badgeKey)
      .then(() => res())
      .catch(rej);
  });
};
