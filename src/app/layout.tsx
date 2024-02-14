import { ReactNode } from "react";
import { IsClientCtxProvider } from "#/src/ui/ClientCtxProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "#/src/styles/theme";

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
        <body className="h-screen w-screen">
          <IsClientCtxProvider>
            <div id="main" className="h-full w-full">
              {children}
            </div>
          </IsClientCtxProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
