import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import theme from "#/src/styles/theme";
import type { Metadata } from "next";


const title = "kaptcha-me";

export const metadata: Metadata = {
  title: "kaptcha-me",
  // openGraph: {
  //   title,
  //   images: [`/api/og?title=${title}`],
  // },
};

export default function Layout({ children }: {children: ReactNode}) {
  return (
    <Box id="kaptchame-layoutBoxWrapper" height="100vh" width="100vw">
      {children}
    </Box>
  );
}

// export const runtime = "edge"; // 'nodejs' (default) | 'edge'
