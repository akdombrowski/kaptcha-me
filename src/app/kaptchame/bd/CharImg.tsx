"use client";
import "client-only";

import Box from "@mui/material/Box";
import { getImageProps } from "next/image";
import Image from "next/image";
import { ReactNode, type CSSProperties, type ReactElement, type SyntheticEvent } from "react";

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

export default function CharImg({
  src,
  onLoad,
  onError,
  isHorizontal,
}: {
  src: string;
  onLoad: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  onError: (e: SyntheticEvent<HTMLImageElement, Event>) => void;
  isHorizontal?: boolean;
}): ReactElement {
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
  const horizontalStyle = {
    height: "100%",
    width: "auto",
  };
  const style: CSSProperties | undefined = {
    height: "auto",
    width: "100%",
    objectFit: "contain",
  };

  return (
    <Image
      id="mainContainer"
      alt="One of the images of me to kaptcha, choose carefully!"
      src={src}
      fill
      style={{ objectFit: "contain" }}
      onLoad={onLoad}
      onError={onError}
    />
  );
}
