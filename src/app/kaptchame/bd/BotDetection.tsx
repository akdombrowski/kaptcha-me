"use client";

import "client-only";

/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import MotionContainer, {
  type MeInMotion,
} from "@/kaptchame/bd/MotionContainer.OLD";
import ContainerWithThemedBGImg from "#/src/app/kaptchame/bd/ContainerWithThemedBGImg";
import CharImg from "@/kaptchame/bd/CharImg";
import MotionDiv from "@/components/motion/MotionDiv";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimate,
  AnimatePresence,
  stagger,
} from "framer-motion";
import MotionCharacterImgBtn from "@/components/motion/ImgBtn";

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
 * Do this to restart the motion animation from the beginning
 *
 * Start
 */
// @refresh reset
/**
 * End
 *
 * NextJS Fast Refresh
 *
 * Directive telling NextJS to remount on every edit
 * Do this to restart the motion animation from the beginning
 *
 */

export default function BotDetection(
  BotDetectionProps: Readonly<{ BotDetectionProps }>,
) {
  const motionValues: { [key: string]: MotionValue } = {};

  const variants: Variants = {
    parent: {
      transition: {
        when: "staggerChildren",
      },
    },
    right: {
      x: window.innerWidth,
      transition: { ease: "easeOut", duration: 5, when: "staggerChildren" },
    },
    left: {
      x: 0,
      transition: { ease: "easeOut", duration: 5, when: "staggerChildren" },
    },
  };

  const rightMovingXPositions = [0, window.innerWidth];
  const leftMovingXPositions = [90, 0];
  const rotations = [0, 180];
  const translations = [0, -1];

  const children = () => {
    let chil = new Array(5);
    for (let i = 0; i < chil.length; i++) {

      const id = `optionBtn-${i}`;
      chil[i] = (
        <MotionDiv
          id={id}
          key={`optionBtn-${i}`}
          src={kmGoKartR}
          variants={variants}
          animate="right"
        />
      );
    }
    return chil;
  };

  return (
    <ContainerWithThemedBGImg>
      <Countdown/>
      <motion.div initial="parent" animate="parent" variants={variants}>
        <AnimatePresence>
          {/* <MotionDiv
          id="option1"
          src={kmGoKartR}
          // initial={{ x: 0 }}
          style={{ x }}
          direction="right"
          animate={{ x: "90vw" }}
          transition={{ ease: "easeOut", duration: 7 }}
        /> */}
          {children()}
        </AnimatePresence>
      </motion.div>
    </ContainerWithThemedBGImg>
  );
}
