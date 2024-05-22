import "client-only";

import { Button, type ButtonProps } from "@mui/material";
import { forwardRef, useRef, useEffect, useState } from "react";
import MotionImgBtn, {
  MotionKaptchaMeImgBtn,
} from "#/src/ui/components/motion/MotionImgBtn";
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
  const isPresent = useIsPresent();
  const x = useMotionValue(0);
  const screenRightEdge = window.innerWidth - 300;
  const [scope, animate] = useAnimate();
  const delay = 3;
  // const [animateControls, setAnimateControls] = useState<AnimationPlaybackControls | null>(null)
  let animateControls: AnimationPlaybackControls;
  // This + the offset dur = the max dur for a character to move across the screen
  const maxDurSecondsMotion = 950;
  // This is the min. dur for a character to move across the screen
  const maxDurSecondsMotionOffset = Math.ceil(screenRightEdge);
  // Haven't tested thoroughly, but hopefully using 2x rnd fn calls will create a
  // little more variability
  const duration =
    ((Math.random() * maxDurSecondsMotion) / 2 +
      (Math.random() * maxDurSecondsMotion) / 2 +
      maxDurSecondsMotionOffset) /
    199;

  console.log(`${props.id} duration + delay: ${duration + delay} `);

  const motionEvnt = () => {
    // useMotionValueEvent(x, "animationComplete", () => {
    console.log("animation complete");
    const lastX = x.get();

    console.log("lastX:", lastX);
    console.log(`${props.id} setting time to  ${duration + delay - 1} `);
    animateControls.time = duration + delay - 1;
    // if (lastX >= screenRightEdge) {
    if (lastX >= 0) {
      // console.log(`setting time to ${duration + 1} `);
      // animateControls.time = duration + 1;
      // console.log("restarting animation");
      // animateControls.play();
      // console.log(`setting time to delay: ${delay} `);
      // animateControls.time = delay;
    }

    console.log("");
    // });
  };

  // TODO:
  // DONT THINK SEQUENCES ARE GOING TO WORK
  // CAN I TRIGGER ANOTHER ANIMATE BASED BY AWAITING THE PREVIOUS ANIMATION'S
  // PROMISE TO RESOLVE AND TRIGGERING THE OTHER ONE (HEADING IN THE OTHER
  // DIRECTION)
  // THAT'S AFTER RUNNING THE STARTING ANIMATION WITH THE DELAY
  const sequence = [
    [
      x,
      screenRightEdge,
      {
        type: "tween",
        ease: "linear",
        delay: delay,
        duration,
      },
    ],
    [
      x,
      0,
      {
        type: "tween",
        ease: "linear",
        duration,
      },
    ],
    [
      x,
      screenRightEdge,
      {
        type: "tween",
        ease: "linear",
        duration,
        at: "+1",
      },
    ],
  ];

  const start = async () => {};

  useEffect(() => {
    // const controls = animate(x, screenRightEdge, {
    // animateControls = animate(x, screenRightEdge, {
    //   type: "tween",
    //   ease: "linear",
    //   duration:
    //     // Haven't tested, but hopefully using 2x rnd fn calls will create a
    //     // little more variability
    //     ((Math.random() * maxDurSecondsMotion) / 2 +
    //       (Math.random() * maxDurSecondsMotion) / 2 +
    //       +maxDurSecondsMotionOffset) /
    //     199,
    //   delay: 3,
    //   onComplete: (v) => {
    //     console.log("v:", v);
    //   },
    // });
    // async function start() {
    //   animateControls = animate(x, screenRightEdge, {
    //     type: "tween",
    //     ease: "linear",
    //     delay: delay,
    //     duration,
    //     at: 0,
    //   });
    //   await animateControls;
    //   animateControls = animate(sequence);
    // }
    // start();

    animateControls = animate(sequence);
    animateControls.then(() => motionEvnt());
    return () => animateControls.stop();
  });

  useEffect(() => {
    !isPresent && console.log("I've been removed!");
  }, [isPresent]);

  return (
    // <motion.div
    //   className="motion-div"
    //   id={props.id}
    //   // data-left-edge={leftEdge}
    //   // data-right-edge={rightEdge}
    //   // data-img-movement-size-px={imgMovementSizePX}
    //   // data-img-movement-size-perc={imgMovementSizePerc}
    //   // data-img-size-px={imgStackSizePX}
    //   // data-img-size-perc={imgStackSizePerc}
    //   animate={props.motionControls}
    //   style={{ x: props.motionValue, width: props.width }}
    //   whileHover={{
    //     scale: 3,
    //     translateY: 0,
    //     transition: { duration: 0.1 },
    //   }}
    //   whileTap={{
    //     scale: 10,
    //     translateY: 0,
    //     transition: { duration: 0.01 },
    //   }}
    //   exit={{ scale: 1000, transition: { duration: 0.1 } }}
    // >
    /* <motion.div
      // initial={props.initial}
      initial="left"
      // style={props.style}
      animate={props.direction}
      transition={props.transition ?? { duration: 5 }}
      variants={variants}
    >*/
    // <motion.div
    //   id={props.id}
    //   initial="left"
    //   // style={{ x }}
    //   animate="right"
    //   // transition={{ ease: "easeOut", duration: 10 }}
    //   exit={{ opacity: 0 }}
    //   variants={variants}
    // >
    //   <ImgBtn id={props.id} width="500" src={props.src} />
    // </motion.div>
    // <MotionImgBtn
    //   id={props.id}
    //   ref={scope}
    //   width={props.width ?? props.height ? "auto" : "10vw"}
    //   height={props.height ?? "auto"}
    //   src={props.src}
    //   style={{ x }}
    //   mv={x}
    //   animate="right"
    //   variants={variants}
    // />
    <MotionKaptchaMeImgBtn
      id={props.id}
      ref={scope}
      width={props.width ?? props.height ? "auto" : "10vw"}
      height={props.height ?? "auto"}
      src={props.src}
      style={{ x }}
      mv={x}
      animate="right"
      variants={variants}
      aspectRatio={props.aspectRatio}
    />
  );
}

export default MotionCharacterImgBtn;
