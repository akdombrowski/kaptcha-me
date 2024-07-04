"use client";
import "client-only";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getImageProps } from "next/image";
import { ReactNode, forwardRef } from "react";
import Countdown from "@/components/Countdown";
import type { IContainerSize } from "@/bd/BotDetection";
import getBGImg from "@/utils/getBGImg";

export interface ThemedBGContainerProps {
  children: ReactNode;
  themeSrc?: string;
  containerSize: IContainerSize;
}

export const ThemedBGContainer = forwardRef(
  (props: ThemedBGContainerProps, ref) => {
    const { children, themeSrc } = props;

    const backgroundImage = getBGImg({
      width: props.containerSize.width,
      height: props.containerSize.height,
      src: "https://i.postimg.cc/DzjCwcwW/race-Track.webp",
      priority: true,
      alt: "kaptcha-me background image: race track",
    });
    const style = {
      height: "100vh",
      width: "100vw",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat no-repeat",
      backgroundSize: "auto 100%",
      backgroundImage,
    };

    return (
      <Box
        id="themedBGContainer"
        ref={ref}
        width="100%"
        height="100%"
        style={style}
        sx={{ overflow: "hidden" }}
      >
        {/* Countdown uses absolute positioning */}
        <Countdown />
        {children}
      </Box>
    );
  },
);

export default ThemedBGContainer;
