"use client";

import "client-only";

import { Button, type ButtonProps } from "@mui/material";
import { forwardRef, useRef, useEffect } from "react";
import MotionImgBtn from "@/components/motion/ImgBtn";
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

export function CharacterImgBtn(props: CharacterImgBtnProps) {
  const isPresent = useIsPresent();
  const x = useMotionValue(0);
  const [scope, animate] = useAnimate();


  useMotionValueEvent(x, "animationComplete", () => {
    console.log("animation complete");
    console.log(x.get());
  });



  useEffect(() => {
    const controls = animate(x, window.innerWidth - 100, {
      type: "linear",
      // stiffness: Math.max(Math.random() * 100   - 60, 10),
      duration: Math.random() * 10 + 2,
      delay: 3,
      onComplete: (v) => {
        console.log("v:", v);
      },
    });

    return () => controls.stop();
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
    <MotionImgBtn
      id={props.id}
      ref={scope}
      width="500"
      src={props.src}
      style={{ x }}
      mv={x}
      animate="right"
      variants={variants}
    />
  );
}

export default CharacterImgBtn;
