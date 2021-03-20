import { browser } from "webextension-polyfill-ts";
import { sendToggleMessage } from "./sendToggleMessage";

export const selectBadge = (badgeKey: string): Promise<void> => {
  return new Promise((res, rej) => {
    browser.storage.sync
      .set({
        [badgeKey]: badgeKey,
      })
      .then(() => {
        sendToggleMessage();
        res();
      })
      .catch(rej);
  });
};
