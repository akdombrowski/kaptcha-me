import "client-only";
// react
import { forwardRef, useRef, useEffect, useState } from "react";
// mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// kaptcha-me
import MotionKaptchaMeImgBtn from "@/components/motion/MotionKaptchaMeImgBtn";
// framer-motion
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
// Interfaces and Types
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
  MotionValueSegment,
  MotionValueSegmentWithTransition,
  DOMSegmentWithTransition,
} from "framer-motion";
import { StaticImageData } from "next/image";

export interface CharacterImgBtnProps extends MotionProps {
  id: string;
  src: string | StaticImageData;
  duration: number;
  containerSize: IContainerSize;
  formAction: (event: SyntheticEvent, data: any) => void;
  delay?: number;
  motionValue?: MotionValue;
  horizontal?: boolean;
  vertical?: boolean;
  startPos?: { [key: string]: string | number };
  endPos?: { [key: string]: string | number };
  direction?: string;
  btn?: ButtonProps;
  width?: number;
  height?: number;
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
    formAction,
  } = props;
  const [scope, animate] = useAnimate();
  const [dir, setDir] = useState("start");
  let slowDownDur = duration;
  let animateControls: AnimationPlaybackControls;

  const getDims = () => {
    let imgWidth, imgHeight;
    if (width) {
      imgWidth = width * containerSize.width * 0.9;
      imgHeight = ((width * containerSize.width) / aspectRatio) * 0.9;
    } else if (height) {
      imgHeight = height * containerSize.height * 0.9;
      imgWidth = height * containerSize.height * aspectRatio * 0.9;
    } else {
      imgWidth = ((200 * containerSize.width) / aspectRatio) * 0.9;
      imgHeight = 200 * containerSize.height * aspectRatio * 0.9;
    }
    return { imgWidth, imgHeight };
  };
  const { imgWidth, imgHeight } = getDims();
  const x = useMotionValue(0 - imgWidth);

  const seqR: DOMSegmentWithTransition[] = [
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

  const seqL: DOMSegmentWithTransition[] = [
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
      formAction={formAction}
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
