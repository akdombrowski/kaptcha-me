"use client";

import "client-only";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useAnimationControls,
} from "framer-motion";
import {
  SyntheticEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
} from "react";
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

const convert5WToPx = () => {
  const windowW = window.innerWidth;
  return (windowW / 100) * 5;
};

export type MeInMotion = {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  charImg: ReactElement;
  bgImageContainerHeight: number;
  bgImageContainerWidth: number;
  theme: string;
  imgStackSize: number;
  movementSize: number;
  moveDir: string;
}

const MotionContainer = (me: MeInMotion) => {
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const bgImageContainerHeight = me.bgImageContainerHeight;
  const y = useMotionValue(0);
  const xRight = useMotionValue("-100vw");
  const xLeft = useMotionValue("100vw");
  const [yFinal, setYFinal] = useState(0);
  const xRightControls = useAnimationControls();
  const xLeftControls = useAnimationControls();
  const imgStackSizePX =
    me.bgImageContainerHeight * me.imgStackSize * 0.01;
  const imgStackSizePerc = me.imgStackSize + "%";
  const imgMovementSizePX = (imgStackSizePX * 16) / 9;
  const imgMovementSizePerc =
    (imgMovementSizePX / me.bgImageContainerWidth) * 100 + "%";
  const rightEdge = me.bgImageContainerWidth + imgMovementSizePX;
  const leftEdge = me.bgImageContainerWidth - rightEdge - imgMovementSizePX;
  const racingThemeTransition = {
    type: "tween",
    duration: me.duration + 2,
    repeat: 0,
    ease: "linear",
  };

  const startMovingRightAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    xRightControls.set({
      x: startPos,
    });
    return xRightControls.start({
      x: rightEdge,
      transition: racingThemeTransition,
    });
  };
  const startMovingLeftAnimation: (start: number) => Promise<any> = (
    startPos,
  ) => {
    xLeftControls.set({
      x: startPos,
    });
    return xLeftControls.start({
      x: leftEdge,
      transition: racingThemeTransition,
    });
  };

  useEffect(() => {
    if (me.theme === "racing") {
      startMovingRightAnimation(0);
    }
  });

  useMotionValueEvent(xRight, "animationComplete", () => {
    startMovingLeftAnimation(rightEdge);
  });
  useMotionValueEvent(xLeft, "animationComplete", () => {
    startMovingRightAnimation(leftEdge);
  });

  useLayoutEffect(() => {
    const pxSizeOf5W = convert5WToPx();

    calculateYInitial(pxSizeOf5W);
    calculateYFinal(bgImageContainerHeight);
  }, [bgImageContainerHeight]);

  const calculateYInitial = (pxSizeOf5W: number) => {
    y.set(pxSizeOf5W * -1);
  };

  const calculateYFinal = (bgImageContainerHeight: number) => {
    setYFinal(bgImageContainerHeight);
  };

  const createMotionDivBasedOnTheme = () => {
    if (me.theme === "racing") {
      return (
        <Box component="form">
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionRight" + me.idNumber}
            data-left-edge={leftEdge}
            data-right-edge={rightEdge}
            data-img-movement-size-px={imgMovementSizePX}
            data-img-movement-size-perc={imgMovementSizePerc}
            data-img-size-px={imgStackSizePX}
            data-img-size-perc={imgStackSizePerc}
            animate={xRightControls}
            style={{ x: xRight, width: imgStackSizePerc }}
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
          >
            <Button
              id={"meImg" + me.idNumber}
              name={"meImg" + me.idNumber}
              className="image-btn-x"
              sx={{ width: "100%" }}
            >{me.charImg}</Button>
          </motion.div>
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionLeft" + me.idNumber}
            data-left-edge={leftEdge}
            data-right-edge={rightEdge}
            data-img-movement-size-perc={imgMovementSizePerc}
            data-img-size-px={imgStackSizePX}
            data-img-size-perc={imgStackSizePerc}
            style={{ x: xLeft, width: imgStackSizePerc }}
            animate={xLeftControls}
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
          >
            <input
              id={"meImg" + me.idNumber}
              name={"meImg" + me.idNumber}
              alt={"kaptcha answer option"}
              className="image-btn-x"
              type="image"
              src={me.img[1]}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
        </Box>
      );
    } else {
      return (
        <motion.div
          ref={dvMotionDiv}
          className="motion-div"
          id={"motion" + me.idNumber}
          style={{ y }}
          // initial={{ y: yInitial }}
          animate={{
            y: yFinal,
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: me.duration,
              repeatType: "reverse",
              type: "tween",
            },
          }}
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
          exit={{ scale: 100, transition: { duration: 0.01 } }}
        >
          <input
            id={"meImg" + me.idNumber}
            name={"meImg" + me.idNumber}
            alt={"kaptcha image option"}
            className="backgroundImg"
            type="image"
            src={me.img}
          ></input>
        </motion.div>
      );
    }
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    me.handleClick(e);
  };

  return createMotionDivBasedOnTheme();
};

export default MotionContainer;
