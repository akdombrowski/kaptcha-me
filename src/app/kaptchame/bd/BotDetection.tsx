"use client";

import "client-only";

/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import MotionContainer, {
  type MeInMotion,
} from "@/kaptchame/bd/MotionContainer.OLD";
import ContainerWithThemedBGImg from "#/src/app/kaptchame/bd/ContainerWithThemedBGImg";
import CharImg from "@/kaptchame/bd/CharImg";
import MotionCharacterImgBtn from "#/src/ui/components/motion/MotionCharacterImgBtn";
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
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Countdown from "#/src/app/kaptchame/bd/Countdown";

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
 */

export default function BotDetection(
  BotDetectionProps: Readonly<{ BotDetectionProps }>,
) {
  const [displayCountdown, setDisplayCountdown] = useState<boolean>(true);

  const motionValues: { [key: string]: MotionValue } = {};
  const countdownFinishedHandler = () => {
    setDisplayCountdown(false);
  };
  const parentVariants: Variants = {
    parent: {
      transition: {
        when: "beforeChildren",
        staggerChildren: 30,
      },
    },
  };
  const variants: Variants = {
    right: {
      x: window.innerWidth,
      transition: { ease: "easeOut", duration: 5 },
    },
    left: {
      x: 0,
      transition: { ease: "easeOut", duration: 5 },
    },
  };

  const rightMovingXPositions = [0, window.innerWidth];
  const leftMovingXPositions = [90, 0];
  const rotations = [0, 180];
  const translations = [0, -1];

  const generateMotionCharacterImgBtns = (params: { count: number }) => {
    const { count } = params;
    let chil = new Array(count);
    let heightPerBtn = 100 / count;
    for (let i = 0; i < chil.length; i++) {
      const id = `optionBtn-${i}`;
      chil[i] = (
        <MotionCharacterImgBtn
          id={id}
          height={`${heightPerBtn}vh`}
          key={`optionBtn-${i}`}
          src={kmGoKartR}
          variants={variants}
          animate="right"
          aspectRatio={100 / 68}
        />
      );
    }
    return chil;
  };

  return (
    <ContainerWithThemedBGImg>
      <Countdown />
      <AnimatePresence>
        <motion.div initial="parent" animate="parent" variants={parentVariants}>
          {generateMotionCharacterImgBtns({ count: 5 })}
        </motion.div>
      </AnimatePresence>
    </ContainerWithThemedBGImg>
  );
}
