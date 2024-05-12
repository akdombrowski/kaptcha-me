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

export interface MotionDivProps {
  id: string;
  src: string;
  direction?: string;
  motionControls?: AnimationControls;
  motionValue?: MotionValue<string>;
  btn?: ButtonProps;
  width?: string;
}

const MotionDiv = forwardRef((props: MotionDivProps) => {
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
      initial={{ x: 0 }}
      animate={{ x: "80vw" }}
      transition={{ duration: 5 }}
    >
      <ImgBtn id={props.id} src={props.src} />
    </motion.div>
  );
});

export default MotionDiv;
