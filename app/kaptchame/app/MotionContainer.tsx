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
} from "react";

const convert5WToPx = () => {
  const windowW = window.innerWidth;
  return (windowW / 100) * 5;
};

const MotionContainer = (props: {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  imgsLoaded: boolean;
  bgImageContainerHeight: number;
  bgImageContainerWidth: number;
  theme: string;
  imgSize: number;
  vwOrVH: string;
}) => {
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  const bgImageContainerHeight = props.bgImageContainerHeight;
  const y = useMotionValue(0);
  const xRight = useMotionValue("-100vw");
  const xLeft = useMotionValue("100vw");
  const [yFinal, setYFinal] = useState(0);
  const xRightControls = useAnimationControls();
  const xLeftControls = useAnimationControls();
  const imgSizePX = props.bgImageContainerHeight * props.imgSize * 0.01;
  const imgSizePerc = props.imgSize + "%";
  const leftEdge = imgSizePX * -2;
  const rightEdge = props.bgImageContainerWidth + imgSizePX * 2;
  const racingThemeTransition = {
    type: "tween",
    duration: props.duration + 2,
    repeat: 0,
    ease: "linear",
  };

  const startMovingRightAnimation: (start: number) => Promise<any> = (
    startPos
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
    startPos
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
    if (props.theme === "racing") {
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
    if (props.theme === "racing") {
      return (
        <>
          <motion.div
            ref={dvMotionDiv}
            className="dv-motion-div-x muscle-container"
            id={"motionDVRight" + props.idNumber}
            animate={xRightControls}
            style={{ x: xRight, width: imgSizePerc }}
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
              id={"dvBtn" + props.idNumber}
              name={"dvBtn" + props.idNumber}
              alt={"captcha image option"}
              className="skbutton-next-x"
              type="image"
              onClick={handleClick}
              value={props.challenge}
              src={props.img[0]}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
          <motion.div
            ref={dvMotionDiv}
            className="dv-motion-div-x muscle-container"
            id={"motionDVLeft" + props.idNumber}
            style={{ x: xLeft, width: imgSizePerc }}
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
              id={"dvBtn" + props.idNumber}
              name={"dvBtn" + props.idNumber}
              alt={"captcha image option"}
              className="skbutton-next-x"
              type="image"
              onClick={handleClick}
              value={props.challenge}
              src={props.img[1]}
              style={{ width: "100%" }}
            ></input>
          </motion.div>
        </>
      );
    } else {
      return (
        <motion.div
          ref={dvMotionDiv}
          className="dv-motion-div muscle-container"
          id={"motionDV" + props.idNumber}
          style={{ y }}
          // initial={{ y: yInitial }}
          animate={{
            y: yFinal,
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: props.duration,
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
            id={"dvBtn" + props.idNumber}
            name={"dvBtn" + props.idNumber}
            alt={"captcha image option"}
            className="skbutton-next backgroundImg"
            type="image"
            onClick={handleClick}
            value={props.challenge}
            src={props.img}
          ></input>
        </motion.div>
      );
    }
  };

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    props.handleClick(e);
  };

  return props.imgsLoaded ? (
    createMotionDivBasedOnTheme()
  ) : (
    <div>Loading...</div>
  );
};

export default MotionContainer;
