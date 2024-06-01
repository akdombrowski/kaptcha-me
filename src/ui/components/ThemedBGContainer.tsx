"use client";
import "client-only";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { getImageProps } from "next/image";
import { ReactNode, forwardRef } from "react";
import Countdown from "@/components/Countdown";

export interface ThemedBGContainerProps {
  children?: ReactNode;
  themeSrc?: string;
}

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export const ThemedBGContainer = forwardRef(
  (props: ThemedBGContainerProps, ref) => {
    const { children, themeSrc } = props;
    const {
      props: { srcSet },
    } = getImageProps({
      width: 1920,
      height: 1080,
      src: "https://i.postimg.cc/DzjCwcwW/race-Track.webp",
      priority: true,
      alt: "kaptcha-me background image: race track",
    });
    const backgroundImage = getBackgroundImage(srcSet);
    const style = {
      height: "100vh",
      width: "100vw",
      backgroundAttachment: "fixed",
      backgroundRepeat: "repeat no-repeat",
      backgroundSize: "auto 100%",
      backgroundImage,
    };

    return (
      <Container
        id="themedBGContainer"
        ref={ref}
        maxWidth={false}
        style={style}
        disableGutters
        sx={{ overflow: "hidden" }}
      >
        {/* Countdown uses absolute positioning */}
        <Countdown />
        {children}
      </Container>
    );
  },
);

export default ThemedBGContainer;
