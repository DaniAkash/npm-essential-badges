import { browser } from "webextension-polyfill-ts";

export const selectBadge = (badgeKey: string): Promise<void> => {
  return new Promise((res, rej) => {
    browser.storage.sync
      .set({
        [badgeKey]: badgeKey,
      })
      .then(() => res())
      .catch(rej);
  });
};
