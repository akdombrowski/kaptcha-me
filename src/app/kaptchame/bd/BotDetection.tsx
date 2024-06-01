"use client";
import "client-only";

// react
import { useEffect, useState, useRef } from "react";
import type { ReactNode } from "react";
/* eslint-disable jsx-a11y/anchor-is-valid */
import ThemedBGContainer from "@/components/ThemedBGContainer";
import KaptchaMeForm from "@/components/motion/KaptchaMeForm";

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimate,
  AnimatePresence,
  stagger,
} from "framer-motion";

import type { MotionValue, Variants } from "framer-motion";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import { ThemedBGContainerProps } from "@/components/ThemedBGContainer";

// // for local dev
const IMG_SIZE = 6;
const IMG_SIZE_RACING = 20;
const NUMBER_OF_DAVINCIS = 9;
const IMG_WIDTH_VW = IMG_SIZE.toString() + "vw";
const IMG_HEIGHT_VH = IMG_SIZE.toString() + "vh";
// const RENDERINGS = testrenderings;
const MIN_DUR = 4;
const MAX_DUR = 8;

// // for local dev
const kmTheme = "racing";
const kmGoKartR = "/me/gokart/r/gokart-R.png";
const kmGoKartL = "/me/gokart/l/gokart-L.png";
// // const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
const bgImg = "/bg/race-Track.png";

export interface BotDetectionProps {
  imgs: string[];
  dur: string | number;
  numChoices: number;
  challenges: Challenges;
}

export interface MotionValuesObj {
  [key: string]: MotionValue;
}

/**
 * NextJS Fast Refresh
 *
 * Directive telling NextJS to remount on every edit
 * Do this to restart the motion animation from the beginning (and reset react state)
 */

/**
 * Start
 */

// @refresh reset

/**
 * End
 */

// react

export interface IContainerSize {
  width: string | number;
  height: string | number;
}
export default function BotDetection(
  BotDetectionProps: Readonly<{ BotDetectionProps }>,
) {
  const themedBGContainerRef = useRef<ThemedBgContainer | null>(null);
  const [containerSize, setContainerSize] = useState<IContainerSize>({
    width: window.innerSize,
    height: window.innerHeight,
  });
  const motionValues: { [key: string]: MotionValue } = {};

  const goKartAspectRatio = 100 / 68;
  const numOptions = 15;
  const formID = "formWrapperForBtns";

  const createResizeObserver = () => {
    return new ResizeObserver(
      (entries: Element, observer: typeof ResizeObserver) => {
        let width, height;
        for (const entry of entries) {
          // borderBoxSize is newer and preferred but may not be supported on all
          // browsers like the older contentRect is likely to be
          if (entry.borderBoxSize) {
            width = entry.borderBoxSize[0].inlineSize;
            height = entry.borderBoxSize[0].blockSize;
          } else {
            width = entry.contentRect.width;
            height = entry.contentRect.height;
          }
        }
        setContainerSize({ width, height });
      },
    );
  };

  const resizeObserver = createResizeObserver();

  useEffect(() => {
    if (themedBGContainerRef.current) {
      resizeObserver.observe(themedBGContainerRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [themedBGContainerRef]);

  return (
    <ThemedBGContainer
      themeSrc={"https://i.postimg.cc/DzjCwcwW/race-Track.webp"}
      ref={themedBGContainerRef}
    >
      <KaptchaMeForm
        formID={formID}
        numOptions={numOptions}
        containerSize={containerSize}
      />
    </ThemedBGContainer>
  );
}
