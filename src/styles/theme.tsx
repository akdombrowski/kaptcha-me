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
    salmon: PaletteColor;
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
    salmon: PaletteColor;
  }

  interface PaletteColor {
    darker?: string;
  }

  interface SimplePaletteColorOptions {
    darker?: string;
  }

  interface Theme {
    status: {
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

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    salmon: true;
    dark: true;
  }
}

let theme = createTheme({
  // Theme customization goes here as usual, including tonalOffset and/or
  // contrastThreshold as the augmentColor() function relies on these
});

theme = createTheme(theme, {
  palette: {
    mode: "dark",
    primary: {
      main: "#0033b5",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#27004f",
      light: "#5b00b5",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ff00d9",
    },
    divider: "#002a10",
    background: {
      default: "#001445",
      paper: "#001c63",
      dark: "#00113e",
    },
    text: {
      primary: "#320000",
      secondary: "#00ddff",
      dark: "#002a31",
    },
    salmon: theme.palette.augmentColor({
      color: {
        main: "#FF5733",
      },
      name: "salmon",
    }),
  },
});

export default theme;
