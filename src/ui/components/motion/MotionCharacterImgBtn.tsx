import "client-only";

import { Button, type ButtonProps } from "@mui/material";
import { forwardRef, useRef, useEffect, useState } from "react";
import MotionKaptchaMeImgBtn from "#/src/ui/components/motion/MotionImgBtn";
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

import type { CSSProperties } from "react";
import { IContainerSize } from "../../../app/kaptchame/bd/BotDetection";

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
  delay?: number;
  horizontal?: boolean;
  vertical?: boolean;
  startPos?: { [key: string]: string | number };
  endPos?: { [key: string]: string | number };
  direction?: string;
  btn?: ButtonProps;
  width?: string;
  height?: string;
  aspectRatio: number;
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
  } = props;
  const [scope, animate] = useAnimate();
  const [dir, setDir] = useState("start");
  const imgWidth = width
    ? width * containerSize.width
    : height * containerSize.height * aspectRatio;
  const imgHeight = height
    ? height * containerSize.height
    : (width * containerSize.width) / aspectRatio;

  // TODO: x.current disappears once one of the characters reaches the edge of
  // the screen
  const x = useMotionValue(0 - imgWidth);
  let slowDownDur = duration;
  let animateControls: AnimationPlaybackControls;

  const seqR = [
    [
      scope.current,
      { scaleX: 1 },
      {
        duration: 1,
      },
    ],
    [
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
      { scaleX: -1 },
      {
        duration: 1,
      },
    ],
    [
      scope.current,
      { x: 0 - width },
      {
        type: "tween",
        ease: "linear",
        duration,
        // at: "+1",
      },
    ],
  ];

  const motionEvnt = (animateConfig) => {
    const lastX = x.get();
    animateControls = animate(scope.current);

    console.log("");
  };

  useMotionValueEvent(x, "animationComplete", () => {
    console.log("animationComplete");
  });

  useMotionValueEvent(x, "change", (latest) => {
    // console.log("change:", latest);
  });

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

  useEffect(() => {
    if (dir === "start") {
      animateControls = animate(
        scope.current,
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

  return (
    <MotionKaptchaMeImgBtn
      id={id}
      ref={scope}
      width={imgWidth}
      height={imgHeight}
      src={src}
      style={{ x }}
      aspectRatio={aspectRatio}
    />
  );
}

export default MotionCharacterImgBtn;
