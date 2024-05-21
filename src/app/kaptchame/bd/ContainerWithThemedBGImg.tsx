"use client";
import "client-only";

import Container from "@mui/material/Container";
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

export default function ContainerWithThemedBGImg({
  children,
}: {
  children?: ReactNode;
}) {
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
  const style = { height: "100vh", width: "100vw", backgroundAttachment: "fixed", backgroundRepeat: "repeat no-repeat", backgroundSize:"auto 100%", backgroundImage };

  return (
    <Container
      id="mainContainerWithThemedBGImage"
      maxWidth={false}
      style={style}
      sx={{ overflow: "hidden" }}
    >
      {children ?? <></>}
    </Container>
  );
}
