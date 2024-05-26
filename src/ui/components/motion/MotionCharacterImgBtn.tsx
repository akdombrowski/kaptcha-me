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

const variants: Variants = {
  parent: {
    transition: {
      when: "staggerChildren",
    },
  },
  right: {
    x: window.innerWidth - 100,
    transition: { ease: "easeOut", duration: 5 },
  },
  left: { x: 0 },
};

export function MotionCharacterImgBtn(props: CharacterImgBtnProps) {
  const x = useMotionValue(0);
  const screenRightEdge = window.innerWidth - 300;
  const [scope, animate] = useAnimate();
  const [dir, setDir] = useState("start");
  const { id, duration, delay, width, height, src, aspectRatio } = props;
  let slowDownDur = duration;
  // const [animateControls, setAnimateControls] = useState<AnimationPlaybackControls | null>(null)
  let animateControls: AnimationPlaybackControls;

  // console.log(
  //   `${id} duration + delay = ${duration} + ${delay} = ${duration + delay} `,
  // );

  const motionEvnt = (animateConfig) => {
    // console.log("motion even triggered by onComplete");
    const lastX = x.get();
    // console.log("lastX:", lastX);
    animateControls = animate(scope.current);

    // useMotionValueEvent(x, "animationComplete", () => {

    // console.log(`${id} setting time to  ${duration + delay} `);
    // animateControls.time = duration + delay;
    // animateControls.play();
    // animateControls.then(() => {
    //   console.log("animate promise completed. calling motion motionEvnt");
    //   motionEvnt();
    // });

    console.log("");
    // });
  };

  const start = [
    x,
    screenRightEdge,
    {
      type: "tween",
      ease: "linear",
      delay: delay,
      duration,
    },
  ];
  const dirs = {
    left: [
      x,
      0,
      {
        type: "tween",
        ease: "linear",
        duration,
      },
    ],
    right: [
      x,
      screenRightEdge,
      {
        type: "tween",
        ease: "linear",
        duration,
      },
    ],
  };

  const seqR = [
    [
      scope.current,
      { scaleX: 1 },
      {
        duration: 0.5,
      },
    ],
    [
      scope.current,
      { x: screenRightEdge - 100 },
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
        duration: 0.5,
      },
    ],
    [
      scope.current,
      { x: 0 },
      {
        type: "tween",
        ease: "linear",
        duration,
        // at: "+1",
      },
    ],
  ];

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
        animateControls = animate(
          // scope.current,
          // { x: screenRightEdge - 100, scaleX: -1 },
          // {
          //   type: "tween",
          //   ease: "linear",
          //   duration,
          // },
          seqR,
        );
      } else if (dir === "left") {
        animateControls = animate(
          // scope.current,
          // { x: 0, scaleX: -1 },
          // {
          //   type: "tween",
          //   ease: "linear",
          //   duration,
          // },
          seqL,
        );
      }

      animateControls.then(() => {
        // console.log("animate promise completed. calling motion motionEvnt");
        setDir((dir) => (dir === "right" ? "left" : "right"));
      });
      return () => animateControls.stop();
    }
  }, [dir]);

  useEffect(() => {
    if (dir === "start") {
      animateControls = animate(
        scope.current,
        { x: screenRightEdge - 100 },
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
      width={width ?? height ? "auto" : "10vw"}
      height={height ?? "auto"}
      src={src}
      style={{ x }}
      animate="right"
      variants={variants}
      aspectRatio={aspectRatio}
    />
  );
}

export default MotionCharacterImgBtn;
