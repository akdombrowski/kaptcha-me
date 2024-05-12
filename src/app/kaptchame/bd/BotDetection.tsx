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
import { motion } from "framer-motion";
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
}

export default function BotDetection({
  challenges,
}: {
  challenges: Challenges;
}) {
  return (
    <BGImg>
      <MotionDiv id="option1" src={kmGoKartR}/>
    </BGImg>
  );
}
