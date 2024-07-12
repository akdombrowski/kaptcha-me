"use client";

import { createTheme } from "@mui/material/styles";

interface CustomColor {
  main: string;
  light: string;
  dark: string;
  contrastText: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    custom?: Palette["primary"];
    salmon?: PaletteColor;
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
    salmon?: PaletteColor;
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface Theme {
    status?: {
      danger: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

// declare module "@mui/material/Button" {
//   interface ButtonPropsColorOverrides {
//     salmon: true;
//     dark: true;
//   }
// }

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#82FF9E",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#95ff00",
      // light: "#5b00b5",
      // dark: will be calculated from palette.secondary.main,
      // contrastText calculated
    },
    divider: "#ffd781",
    background: {
      default: "#050401",
      paper: "#0F0F1A",
    },
    text: {
      primary: "#45F0DF",
      secondary: "#12E2CE",
      // dark: "#002a31",'
    },
  },
});

export default theme;
