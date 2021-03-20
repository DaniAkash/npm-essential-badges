import { browser } from "webextension-polyfill-ts";
import { sendToggleMessage } from "./sendToggleMessage";

export const unselectBadge = (badgeKey: string): Promise<void> => {
  return new Promise((res, rej) => {
    browser.storage.sync
      .remove(badgeKey)
      .then(() => {
        sendToggleMessage();
        res();
      })
      .catch(rej);
  });
};
