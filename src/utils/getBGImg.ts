import { getImageProps } from "next/image";

export function getBackgroundImage(srcSet: string): string {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default function getBGImg({
  width,
  height,
  src,
  priority,
  alt,
}: {
  width: number;
  height: number;
  src: string;
  priority: boolean;
  alt: string;
}): string {
  const {
    props: { srcSet },
  } = getImageProps({
    width: width,
    height: height,
    src,
    priority,
    alt,
  });

  if (!srcSet) {
    throw new Error("Didn't get an image srcSet.")
  }
  const backgroundImage = getBackgroundImage(srcSet);

  return backgroundImage;

}
