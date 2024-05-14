"use client";

import "client-only";

/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import "./App.css";
import MotionContainer, {
  type MeInMotion,
} from "@/kaptchame/bd/MotionContainer.OLD";
import BGImg from "@/kaptchame/bd/BGImg";
import CharImg from "@/kaptchame/bd/CharImg";
import type { Challenges } from "@/kaptchapi/challenge/create/customFunction";
import MotionDiv from "@/components/motion/MotionDiv";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ImgBtn from "@/components/motion/ImgBtn";

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

export default function BotDetection({
  ...BotDetectionProps
}: {
  BotDetectionProps;
}) {
  const x = useMotionValue(0);
  const variants = {
    parent: {
      transition: {
        when: "staggerChildren",
      },
    },
    right: {
      x: "100%",
    },
    left: { x: 0 },
  };

  const children = () => {
    let chil = new Array(5);
    chil.fill(
      <MotionDiv
        id="option1"
        src={kmGoKartR}
        // initial={{ x: 0 }}
        style={{ x }}
        direction="right"
        animate={{ x: "90vw" }}
        transition={{ ease: "easeOut", duration: 10 }}
      />,
    );
    return chil;
  };

  return (
    <BGImg>
      <motion.div initial="parent" variants={variants}>
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
      </motion.div>
    </BGImg>
  );
}
