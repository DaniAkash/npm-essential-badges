import { browser } from "webextension-polyfill-ts";
import { TOGGLE_OPTION } from "./events";

export const sendToggleMessage = () => {
  browser.tabs.query({}).then((tabs) => {
    tabs.forEach((tab) => {
      browser.tabs.sendMessage(tab?.id ?? 0, {
        eventName: TOGGLE_OPTION,
      });
    });
  });
};
