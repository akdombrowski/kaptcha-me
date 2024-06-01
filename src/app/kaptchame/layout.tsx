import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "@//styles/theme";
import type { Metadata } from "next";

const title = "kaptcha-me";

export const metadata: Metadata = {
  title: "kaptcha-me",
  // openGraph: {
  //   title,
  //   images: [`/api/og?title=${title}`],
  // },
};

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <Box
      id="kaptchame-layoutBoxWrapper"
      height="100vh"
      width="100vw"
      style={{ overflow: "clip" }}
    >
      {children}
    </Box>
  );
}

// export const runtime = "edge"; // 'nodejs' (default) | 'edge'
