export const badgesList = {
  npm: {
    weeklyDownloads: {
      name: "Weekly Downloads",
      url: "https://flat.badgen.net/npm/dw/:packageName",
      isSelected: true,
    },
    monthlyDownloads: {
      name: "Monthly Downloads",
      url: "https://flat.badgen.net/npm/dm/:packageName",
      isSelected: true,
    },
    yearlyDownloads: {
      name: "Yearly Downloads",
      url: "https://flat.badgen.net/npm/dy/:packageName",
      isSelected: true,
    },
  },
  bundlephobia: {
    minified: {
      name: "Minified Size",
      url: "https://flat.badgen.net/bundlephobia/min/:packageName",
      isSelected: true,
    },
  },
};
