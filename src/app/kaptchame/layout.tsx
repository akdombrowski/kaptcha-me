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
    <div id="kaptcha-me-layout-container" className="h-full w-full">
      {children}
    </div>
  );
}

export const runtime = "edge"; // 'nodejs' (default) | 'edge'
