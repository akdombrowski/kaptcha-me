import "client-only";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import type { ButtonProps } from "@mui/material";
import { forwardRef, useRef, useEffect, useState } from "react";
import MotionKaptchaMeImgBtn from "@/components/motion/MotionImgBtn";
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
import { IContainerSize } from "@/kaptchame/bd/BotDetection";

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
  motionValue?: moVa;
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

  useMotionValueEvent(x, "animationComplete", () => {
    console.log(id, "", "animationComplete");
  });

  useMotionValueEvent(x, "change", (currentX) => {
    const a = Math.ceil(Math.abs(currentX));
    const b = a % 188;
    const interval = !b;
    if (Math.abs(currentX) > 400 && Math.abs(currentX) < 700 && interval) {
      console.log(id, "x:", currentX);
      console.log(id, "velocity", "=", x.getVelocity());
      console.log("");
    }
  });

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
