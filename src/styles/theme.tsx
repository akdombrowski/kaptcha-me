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
      main: "#00bfff",
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
      default: "#001445",
      paper: "#001c63",
      dark: "#00113e",
    },
    text: {
      primary: "#000000",
      // secondary: "#320000",
      // dark: "#002a31",
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
