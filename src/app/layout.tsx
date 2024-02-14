import { ReactNode } from "react";
import { IsClientCtxProvider } from "#/src/ui/ClientCtxProvider";
import theme from "#/src/styles/theme";
import Grid from "@mui/material/Unstable_Grid2";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";

interface Props {
  children?: ReactNode;
}

const title = "Kaptcha Me";

export const metadata = {
  title,
  openGraph: {
    title,
    images: [`/api/og?title=${title}`],
  },
};

export default function Layout({ children }: Props) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body style={{ height: "100vh", width: "100vw" }}>
          <IsClientCtxProvider>
            <CssBaseline />
            <Grid
              container
              id="main"
              width="100%"
              height="100%"
              sx={{ backgroundColor: "background" }}
            >
              {children}
            </Grid>
          </IsClientCtxProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
