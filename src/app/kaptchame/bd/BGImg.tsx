"use client";
import "client-only";

import Box from "@mui/material/Box";
import { getImageProps } from "next/image";
import { ReactNode } from "react";

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

export default function BGImg({ children }: { children: ReactNode }) {
  const {
    props: { srcSet },
  } = getImageProps({
    alt: "kaptcha-me race track background image",
    width: 1920,
    height: 1080,
    src: "https://i.postimg.cc/DzjCwcwW/race-Track.webp",
    priority: true,
  });
  const backgroundImage = getBackgroundImage(srcSet);
  const style = { height: "100vh", width: "100vw", backgroundImage };

  return (
    <Box
      id="mainContainer"
      className="main-container sceneImg"
      // style={bgImgLoaded ? { backgroundImage: "url(" + bgImg + ")" } : {}}
      style={style}
    >
      {children}
    </Box>
  );
}
