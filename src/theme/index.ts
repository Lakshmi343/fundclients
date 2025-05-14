import { MantineThemeOverride } from "@mantine/core";

export const customTheme: MantineThemeOverride = {
  defaultRadius: "sm",
  colorScheme: "light",
  colors: {
    secondary: [
      "#f5f7fa",
      "#e4e7eb",
      "#cbd2d9",
      "#9aa5b1",
      "#7b8794",
      "#616e7c", // base
      "#52606d",
      "#3e4c59",
      "#323f4b",
      "#1f2933",
    ],
    primary: [
      "#ffe5e5", // 0 - lightest
      "#fbbcbc", // 1
      "#f39292", // 2
      "#ec6868", // 3
      "#e43e3e", // 4
      "#cc2525", // 5 - base
      "#a11d1d", // 6
      "#781414", // 7
      "#510c0c", // 8
      "#2b0505", // 9 - darkest
    ],
  },
  primaryColor: "primary",
  primaryShade: 6,
  fontFamily: "Poppins, sans-serif",
};
