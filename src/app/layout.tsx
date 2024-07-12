import type { Metadata } from "next";
import type { ReactNode } from "react";

// use `box-sizing: border-sizing` by default rather than content-sizing
import "@/styles/boxSizing.css";

// import styles for fonts
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

/**
 *  Styling for MUI components using theme
 */
import theme from "@/ui/styles/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// nextjs optimization
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

// vercel site performance and analytics
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "kaptcha-me",
  description:
    "Anthony Dombrowski's kaptcha-me, a secure alternative to reCAPTCHA's image grid bot detection protection.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon/gokart_favicon/favicon.ico"
          sizes="any"
        />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <SpeedInsights />
            <Analytics />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
