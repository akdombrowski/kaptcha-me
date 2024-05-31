import "client-only";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import MotionKaptchaMeImgBtn from "@/components/motion/MotionKaptchaMeImgBtn";

import {
  motion,
  useMotionValue,
  useTransform,
  useAnimate,
  AnimatePresence,
  stagger,
  useMotionValueEvent,
  useAnimationControls,
  useIsPresent,
} from "framer-motion";

import { forwardRef, useRef, useEffect, useState } from "react";

import { IContainerSize } from "@/kaptchame/bd/BotDetection";
import type { CSSProperties, SyntheticEvent } from "react";
import type { ButtonProps } from "@mui/material";
import type {
  MotionStyle,
  AnimationControls,
  MotionValue,
  Variants,
  MotionProps,
  AnimationPlaybackControls,
} from "framer-motion";

export interface CharacterImgBtnProps extends MotionProps {
  id: string;
  src: string;
  duration: number;
  containerSize: IContainerSize;
  handleClick?: (event: SyntheticEvent, id: string) => void;
  delay?: number;
  motionValue?: MotionValue;
  horizontal?: boolean;
  vertical?: boolean;
  startPos?: { [key: string]: string | number };
  endPos?: { [key: string]: string | number };
  direction?: string;
  btn?: ButtonProps;
  width?: string;
  height?: string;
  aspectRatio: number;
  formID: string;
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

export function MotionCharacterImgBtn(props: CharacterImgBtnProps) {
  const {
    id,
    duration,
    delay,
    width,
    height,
    src,
    aspectRatio,
    containerSize,
    formID,
  } = props;
  const [scope, animate] = useAnimate();
  const [dir, setDir] = useState("start");
  const imgWidth = width
    ? width * containerSize.width * 0.9
    : height * containerSize.height * aspectRatio * 0.9;
  const imgHeight = height
    ? height * containerSize.height * 0.9
    : ((width * containerSize.width) / aspectRatio) * 0.9;

  const x = useMotionValue(0 - imgWidth);
  let slowDownDur = duration;
  let animateControls: AnimationPlaybackControls;

  const seqR = [
    [
      // x,
      scope.current,
      { scaleX: 1 },
      {
        duration: 1,
      },
    ],
    [
      // x,
      scope.current,
      { x: containerSize.width },
      {
        type: "tween",
        ease: "linear",
        duration,
        // at: "+1",
      },
    ],
  ];

  const seqL = [
    [
      scope.current,
      // x,
      { scaleX: -1 },
      {
        duration: 1,
      },
    ],
    [
      scope.current,
      // x,
      { x: 0 - imgWidth },
      {
        type: "tween",
        ease: "linear",
        duration,
        // at: "+1",
      },
    ],
  ];

  // Run an animation in one direction and switch to the opposite direction
  // animation when complete
  useEffect(() => {
    if (dir !== "start") {
      slowDownDur *= 1.01;
      if (dir === "right") {
        animateControls = animate(seqR);
      } else if (dir === "left") {
        animateControls = animate(seqL);
      }

      animateControls.then(() => {
        setDir((dir) => (dir === "right" ? "left" : "right"));
      });

      return () => animateControls.stop();
    }
  }, [dir]);

  // On initial render, start animation
  useEffect(() => {
    if (dir === "start") {
      animateControls = animate(
        scope.current,
        // x,
        { x: containerSize.width },
        {
          type: "tween",
          ease: "linear",
          delay: delay,
          duration,
        },
      );

      animateControls.then(() => {
        setDir("left");
      });

      return () => animateControls.stop();
    }
  }, []);

  // useMotionValueEvent(x, "animationComplete", () => {
  //   console.log(id, "", "animationComplete");
  // });

  // useMotionValueEvent(x, "change", (currentX) => {
  // });

  const handleClick = (event: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (handleClick) {
      props.handleClick(event, id);
    }
  };

  return (
    <MotionKaptchaMeImgBtn
      id={id}
      formID={formID}
      ref={scope}
      width={imgWidth}
      height={imgHeight}
      src={src}
      style={{ x }}
      aspectRatio={aspectRatio}
      onClick={handleClick}
      whileHover={{
        scale: 3,
        translateY: 0,
        transition: { duration: 0.1 },
      }}
      whileTap={{
        scale: 10,
        translateY: 0,
        transition: { duration: 0.01 },
      }}
      exit={{ scale: 1000, transition: { duration: 0.1 } }}
    />
  );
}

export default MotionCharacterImgBtn;
