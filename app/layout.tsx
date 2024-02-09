import { ReactNode } from "react";
import { IsClientCtxProvider } from "#/ui/ClientCtxProvider";
import { ThemeProvider } from "@mui/material/styles";
import theme from "#/styles/theme";

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
        <body className="h-screen w-screen m-0">
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
