"use client";

import "client-only";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useAnimationControls,
  type AnimationControls,
  type MotionValue,
} from "framer-motion";
import { Button, type ButtonProps } from "@mui/material";
import { forwardRef, useRef } from "react";
import ImgBtn from "@/components/motion/ImgBtn";
import type { CSSProperties } from "react";
import type { MotionStyle } from "framer-motion";

export interface MotionDivProps {
  id: string;
  src: string;
  style?: MotionStyle;
  horizontal?: boolean;
  vertical?: boolean;
  startPos?: { [key: string]: string | number };
  endPos?: { [key: string]: string | number };
  initial?: { [key: string]: string | number } | boolean;
  animate?: { [key: string]: string | number };
  transition?: { [key: string]: string | number };
  direction?: string;
  motionControls?: AnimationControls;
  motionValue?: MotionValue<string>;
  btn?: ButtonProps;
  width?: string;
}

const MotionDiv = forwardRef((props: MotionDivProps) => {
  const ref = useRef(null);
  const initial = () => {
    const init = props.initial ?? {};

    // if startPos was given, add it
    // !! this will override the start pos if given in the initial prop
    if (props.startPos) {
      const key = Object.keys(props.startPos)[0];
      const pos = props.startPos[key];
      init[key] = pos;
    }
  };

  // !!TODO: Do the same as initial above for animate & transition or switch to not being
  // able to supply both properties

  const variants = {
    left: { x: 0 },
    right: { x: "80%" },
  };

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
    <motion.div
      // initial={props.initial}
      initial="left"
      // style={props.style}
      animate={props.direction}
      transition={props.transition ?? { duration: 5 }}
      variants={variants}
    >
      <ImgBtn id={props.id} width="500" src={props.src} />
    </motion.div>
  );
});

export default MotionDiv;
