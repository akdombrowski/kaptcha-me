"use client";

import "client-only";

/* eslint-disable jsx-a11y/anchor-is-valid */
import Countdown from "@/kaptchame/bd/Countdown";
import ThemedBGContainer from "@/components/ThemedBGContainer";
import MotionCharacterImgBtn from "@/components/motion/MotionCharacterImgBtn";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimate,
  AnimatePresence,
  stagger,
} from "framer-motion";

import type { Challenges } from "@/kaptchapi/challenge/create/customFunction";
import type { MotionValue, Variants } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemedBGContainerProps } from "../../../ui/components/ThemedBGContainer";

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
const kmGoKartR = "https://i.ibb.co/zm6cRTt/gokart-R.png";
const kmGoKartL = "/me/gokart/l/gokart-L.png";
// // const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
const bgImg = "https://i.postimg.cc/DzjCwcwW/race-Track.webp";

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
 *
 *
 */

export interface IContainerSize {
  width: string | number;
  height: string | number;
}

export default function BotDetection(
  BotDetectionProps: Readonly<{ BotDetectionProps }>,
) {
  const themedBGContainerRef = useRef<ThemedBgContainer | null>(null);
  const [imgBtns, setImgBtns] = useState<MotionCharacterImgBtn[] | null>(null);
  const [containerSize, setContainerSize] = useState<IContainerSize>({
    width: window.innerSize,
    height: window.innerHeight,
  });
  const goKartAspectRatio = 100 / 68;
  const motionValues: { [key: string]: MotionValue } = {};
  const numOptions = 2;

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

  useEffect(() => {
    if (containerSize.width) {
      const charImgBtns = generateMotionCharacterImgBtns({
        numOptions,
        containerSize,
      });
      setImgBtns(charImgBtns);
    }
  }, [containerSize]);

  const useMotionValueWithImgBtn = (params: {
    numOptions: number;
    containerSize: IContainerSize;
    height?: string | number;
    width?: string | number;
  }) => {
    const imgWidth = width
      ? width * containerSize.width
      : height * containerSize.height * goKartAspectRatio;
    const imgHeight = height
      ? height * containerSize.height
      : (width * containerSize.width) / goKartAspectRatio;
    const moVal = useMotionValue(0 - imgWidth);
    return moVal;
  };

  const generateMotionCharacterImgBtns = (params: {
    numOptions: number;
    containerSize: IContainerSize;
  }) => {
    const { numOptions, containerSize } = params;

    let chil = new Array(numOptions);
    let heightPerBtn = 1 / numOptions;
    const delay = 3;

    for (let i = 0; i < chil.length; i++) {
      // This + the offset dur = the max dur for a character to move across the screen
      const maxDurSecondsMotion = 950;
      // This is the min. dur for a character to move across the screen
      const maxDurSecondsMotionOffset = Math.ceil(containerSize.width);
      // Haven't tested thoroughly, but hopefully using 2x rnd fn calls will create a
      // little more variability
      const duration = parseFloat(
        Number(
          ((Math.random() * maxDurSecondsMotion) / 2 +
            (Math.random() * maxDurSecondsMotion) / 2 +
            maxDurSecondsMotionOffset) /
            199 /
            1.1,
        ).toPrecision(2),
      );

      const id = `optionBtn-${i}`;
      chil[i] = (
        <MotionCharacterImgBtn
          id={id}
          height={heightPerBtn}
          key={`optionBtn-${i}`}
          src={kmGoKartR}
          containerSize={containerSize}
          aspectRatio={100 / 68}
          duration={duration}
          delay={delay}
        />
      );
    }
    return chil;
  };

  return (
    <ThemedBGContainer
      themeSrc={"https://i.postimg.cc/DzjCwcwW/race-Track.webp"}
      ref={themedBGContainerRef}
    >
      {/* Countdown uses absolute positioning */}
      <Countdown />
      {imgBtns}
    </ThemedBGContainer>
  );
}
