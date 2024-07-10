import "client-only";

// react
import { useEffect, useState } from "react";
// kaptcha-me
import MotionKaptchaMeImgBtn from "@/components/motion/MotionKaptchaMeImgBtn";
// framer-motion
import { useAnimate, useMotionValue } from "framer-motion";

// Interfaces and Types
import { IContainerSize } from "@/kaptchame/bd/BotDetection";
import type { FormEvent, SyntheticEvent } from "react";
import type { ButtonProps } from "@mui/material";
import type {
  AnimationPlaybackControls,
  DOMSegmentWithTransition,
  BezierDefinition,
  MotionProps,
  MotionValue,
} from "framer-motion";
import { StaticImageData } from "next/image";

export interface CharacterImgBtnProps extends MotionProps {
  id: string;
  src: string | StaticImageData;
  duration: number;
  containerSize: IContainerSize;
  formAction?:
    | ((event: SyntheticEvent, data: any) => void)
    | ((choice: FormEvent<HTMLButtonElement>) => Promise<void>);
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
  value: string;
  top: number;
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
    value,
    top,
  } = props;
  const [scope, animate] = useAnimate();
  const [dir, setDir] = useState("start");
  const [slowdown, setSlowdown] = useState((1 / duration) * 0.01);
  const type = "tween";
  const ease: BezierDefinition = [
    0.0 + Math.random() * 0.001,
    0.1 + Math.random() * 0.1,
    0.9 + Math.random() * 0.05,
    0.8 - Math.random() * 0.1,
  ];
  const turnAroundDur = 1 - ((duration + slowdown) / (duration + slowdown + 1)) * 0.15;
  console.log("duration:", duration, " ", "turanroundDur:", turnAroundDur);
  let animateControls: AnimationPlaybackControls;

  const getDims = () => {
    let imgWidth, imgHeight;
    if (width) {
      imgWidth = width * containerSize.width * 0.9 * 0.01;
      imgHeight = ((width * containerSize.width) / aspectRatio) * 0.9 * 0.01;
    } else if (height) {
      imgHeight = height * containerSize.height * 0.9 * 0.01;
      imgWidth = height * containerSize.height * aspectRatio * 0.9 * 0.01;
    } else {
      imgWidth = ((200 * containerSize.width) / aspectRatio) * 0.9 * 0.01;
      imgHeight = 200 * containerSize.height * aspectRatio * 0.9 * 0.01;
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
        duration: turnAroundDur,
      },
    ],
    [
      // x,
      scope.current,
      { x: containerSize.width },
      {
        type,
        ease,
        duration: duration + slowdown,
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
        duration: turnAroundDur,
      },
    ],
    [
      scope.current,
      // x,
      { x: 0 - imgWidth },
      {
        type,
        ease,
        duration: duration + slowdown,
        // at: "+1",
      },
    ],
  ];

  // Run an animation in one direction and switch to the opposite direction
  // animation when complete
  useEffect(() => {
    if (dir !== "start") {
      setSlowdown((slowdown) => slowdown * ((1 / duration) * 0.01));
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

  // On initial render, start animation with delay to wait for countdown
  useEffect(() => {
    if (dir === "start") {
      animateControls = animate(
        scope.current,
        // x,
        { x: containerSize.width },
        {
          type,
          ease,
          delay,
          duration: duration + slowdown,
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
      value={value}
      top={top}
      style={{ x }}
      aspectRatio={aspectRatio}
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
