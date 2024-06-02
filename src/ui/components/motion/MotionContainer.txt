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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import testrenderings from "#/src/app/kaptchame/bd/TestRenderings";
import CharImg from "#/src/app/kaptchame/bd/CharImg";

const convert5WToPx = () => {
  const windowW = window.innerWidth;
  return (windowW / 100) * 5;
};

// for local dev
const IMG_SIZE = 6;
const IMG_SIZE_RACING = 20;
const NUMBER_OF_DAVINCIS = 9;
const IMG_WIDTH_VW = IMG_SIZE.toString() + "vw";
const IMG_HEIGHT_VH = IMG_SIZE.toString() + "vh";
const RENDERINGS = testrenderings;
const MIN_DUR = 4;
const MAX_DUR = 8;

// for local dev
const theme = "racing";
// const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
const bgImg = "https://i.postimg.cc/DzjCwcwW/race-Track.webp";

export type CharImgDurObjType = {
  img: ReactElement;
  dur: number;
};

type motioncontainerprops = {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  imgsLoaded: boolean;
  bgImageContainerHeight: number;
  bgImageContainerWidth: number;
  theme: string;
  imgStackSize: number;
  movementSize: number;
  moveDir: string;
};

/**
 * It generates an array of random numbers between MIN_DURATION and
 * MIN_DURATION + 4 for the duration of img moving through its range
 * @returns An array of numbers.
 */
const generateDuration = (): number => {
  let min = MIN_DUR;
  let max = MAX_DUR;
  if (theme.startsWith("racing")) {
    min = 5;
    max = 25;
  }
  const duration = Math.random() * (max - min) + min;

  return duration;
};

const convertRenderingsToObj = () => {
  if (RENDERINGS) {
    if (typeof RENDERINGS === "string") {
      try {
        return JSON.parse(RENDERINGS);
      } catch (e) {
        throw new Error("Couldn't parse string of renderings.", { cause: e });
      }
    } else {
      try {
        return JSON.parse(JSON.stringify(RENDERINGS));
      } catch (e) {
        throw new Error("This non-string can't be parse as a JSON object", {
          cause: e,
        });
      }
    }
  } else {
    console.error("missing renderings");
  }

  return null;
};

const renderings: {
  [key: number]: { value: string; pos: number; img: string };
} = convertRenderingsToObj();

// const precacheImage = (
//   imgsSet: Set<string>,
//   imgSrc: string,
//   proms: Promise<string>[],
// ) => {
//   const img = new Image();
//   imgsSet.add(imgSrc);
//   proms.push(
//     new Promise<string>((resolve, reject) => {
//       img.onload = () => {
//         // console.log(imgSrc, "loaded");
//         resolve("loaded: " + imgSrc);
//       };
//       img.onerror = () => {
//         console.log(imgSrc, "loading failed");
//         reject("loading failed for image: " + imgSrc);
//       };
//     }),
//   );

//   img.src = imgSrc;
//   img.loading = "eager";
//   return { imgsSet, proms };
// };

const precacheImage = (imgsSet: Set<string>, imgSrc: string) => {
  const loadedImgs = new Set<string>();
  const erroredImgs = new Set<string>();
  const img = (
    <CharImg
      src={imgSrc}
      onLoad={(e: SyntheticEvent) => loadedImgs.add(imgSrc)}
      onError={(e: SyntheticEvent) => erroredImgs.add(imgSrc)}
    />
  );
  imgsSet.add(imgSrc);

  return { img, imgsSet, loadedImgs, erroredImgs };
};

// const precacheBGImage = (bgImg: string) => {
//   const imgsSet = new Set<string>();
//   let proms: Promise<string>[] = [];

//   ({ proms } = precacheImage(imgsSet, bgImg, proms));

//   return proms;
// };

const precacheAllImagesNeeded = async () => {
  if (!renderings) {
    throw new Error("didn't get renderings info");
  }

  let imgsSet = new Set<string>();
  let loadedImgs = new Set<string>();
  let erroredImgs = new Set<string>();
  const charImgs: CharImgDurObjType[] = [];

  for (const r of Object.values(renderings)) {
    const dur = generateDuration();
    let img: ReactElement;

    if (theme.startsWith("racing")) {
      const img0 = r.img[0];
      const img1 = r.img[1];
      if (!imgsSet.has(img0)) {
        ({ img, imgsSet, loadedImgs, erroredImgs } = precacheImage(
          imgsSet,
          img0,
        ));
        charImgs.push({ img, dur });
      }
      if (!imgsSet.has(img1)) {
        ({ img, imgsSet, loadedImgs, erroredImgs } = precacheImage(
          imgsSet,
          img1,
        ));
        charImgs.push({ img, dur });
      }
    } else {
      if (!imgsSet.has(r.img)) {
        ({ img, imgsSet, loadedImgs, erroredImgs } = precacheImage(
          imgsSet,
          r.img,
        ));
        charImgs.push({ img, dur });
      }
    }
  }

  return { charImgs, imgsSet, loadedImgs, erroredImgs };
};

export type MeInMotion = {
  idNumber: number;
  duration: number;
  challenge: string;
  img: string;
  handleClick: Function;
  charImg: ReactElement;
  bgImageContainerWidth: number;
  theme: string;
  imgStackSize: number;
  movementSize: number;
  moveDir: string;
};

export default function MotionContainer() {
  // const [bgImgLoaded, setBGImgLoaded] = useState(false);
  const [loadedImgs, setLoadedImgs] = useState<Set<string> | null>(null);
  const [erroredImgs, setErroredImgs] = useState<Set<string> | null>(null);
  const [imgs, setImgs] = useState<Set<string> | null>(null);
  const [charImgs, setCharImgs] = useState<CharImgDurObjType[] | null>(null);
  const [areImgsLoaded, setAreImgsLoaded] = useState<boolean>(false);
  const [bgImageContainerHeight, setBgImageContainerHeight] = useState(0);
  const [bgImageContainerWidth, setBgImageContainerWidth] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const dvMotionDiv = useRef<HTMLDivElement>(null);
  let stackSize;
  let movementSize;

  if (charImgs) {
    stackSize = Math.floor(100 / charImgs.length);
    movementSize = (stackSize * 16) / 9;

    // return (
    // <>
    {
      charImgs.map(
        (
          charImgDurObj: {
            img: ReactElement;
            dur: number;
          },
          i: number,
        ) => {
          let style;
          let rowOrClass;
          let moveDir;
          const challenge = renderings[i].value;
          const img = renderings[i].img;

          if (theme.startsWith("racing")) {
            moveDir = "x";
            style = {
              top: renderings[i].pos.toString() + "%",
              height: stackSize + "%",
            };
            rowOrClass = "rows";
          } else {
            moveDir = "y";
            style = {
              left: renderings[i].pos.toString() + "%",
              width: stackSize + "%",
            };
            rowOrClass = "cols";
          }

          const props: MeInMotion = {
            idNumber: i,
            duration: charImgDurObj.dur,
            challenge: challenge,
            img: img,
            handleClick: updateValueAndAdvanceFlow,
            charImg: charImgDurObj.img,
            bgImageContainerWidth: bgImageContainerWidth,
            theme: theme,
            imgStackSize: stackSize,
            movementSize: movementSize,
            moveDir: moveDir,
          };

          //     return (
          //       <div
          //         id={"imgCol" + i}
          //         key={"imgCol" + i}
          //         className={rowOrClass}
          //         data-id-number={i}
          //         data-duration={charImgDurObj.dur}
          //         data-imgs-loaded={loadedImgs}
          //         data-bg-image-container-height={bgImageContainerHeight}
          //         data-bg-image-container-width={bgImageContainerWidth}
          //         data-img-size={stackSize}
          //       >
          //         <form
          //           id={"kaptcha-form" + i}
          //           key={"kaptcha-form" + i}
          //           className="form"
          //           // action={checkChall}
          //           action="/api/kaptchapi/challenge/check"
          //           autoComplete="off"
          //           method="POST"
          //           noValidate
          //         >
          //           <input
          //             type="hidden"
          //             id={"chall" + i}
          //             name={"challenge"}
          //             value={challenge}
          //           />
          //           {MotionContainer(props)}
          //         </form>
          //       </div>
          //     );
          //   },
          // )}
          // </>
        },
      );
    }
  }

  const y = useMotionValue(0);
  const xRight = useMotionValue("-100vw");
  const xLeft = useMotionValue("100vw");
  const [yFinal, setYFinal] = useState(0);
  const xRightControls = useAnimationControls();
  const xLeftControls = useAnimationControls();
  const imgStackSizePX = bgImageContainerHeight * stackSize * 0.01;
  const imgStackSizePerc = stackSize + "%";
  const imgMovementSizePX = (imgStackSizePX * 16) / 9;
  const imgMovementSizePerc =
    (imgMovementSizePX / bgImageContainerWidth) * 100 + "%";
  const rightEdge = bgImageContainerWidth + imgMovementSizePX;
  const leftEdge = bgImageContainerWidth - rightEdge - imgMovementSizePX;
  const racingThemeTransition = {
    type: "tween",
    duration: duration + 2,
    repeat: 0,
    ease: "linear",
  };

  // const waitForBGImage = async () => {
  //   await Promise.all(precacheBGImage(bgImg));
  //   setBGImgLoaded(true);
  // };

  const waitForImages = async () => {
    const { charImgs, imgsSet, loadedImgs, erroredImgs } =
      await precacheAllImagesNeeded();
    setLoadedImgs(loadedImgs);
    setErroredImgs(erroredImgs);
    setImgs(imgsSet);
    setCharImgs(charImgs);
  };

  // useEffect(() => {
  //   waitForBGImage();
  // }, []);

  useEffect(() => {
    if (window) {
      const height = window.innerHeight;
      const width = window.innerWidth;
      setBgImageContainerHeight(height);
      setBgImageContainerWidth(width);
    } else {
      throw new Error("no window");
    }
  }, []);

  useEffect(() => {
    if (!erroredImgs?.size) {
      setAreImgsLoaded(true);
    }
  });

  useEffect(() => {
    waitForImages();
  }, []);

  const resizeObserver = new ResizeObserver((entries) => {
    // entry is a ResizeObserverEntry
    for (const entry of entries) {
      if (entry.contentBoxSize) {
        const contentBoxSize = entry.contentBoxSize[0];
        const height = contentBoxSize.blockSize;
        const width = contentBoxSize.inlineSize;

        setBgImageContainerHeight(height);
        setBgImageContainerWidth(width);
      }
    }
  });

  // useEffect(() => {
  //   if (imgsLoaded) {
  //     if (mainContainerRef?.current) {
  //       const curr = mainContainerRef.current as HTMLDivElement;
  //       resizeObserver.observe(curr);
  //       return () => {
  //         resizeObserver.unobserve(curr);
  //       };
  //     } else {
  //       console.error("main bg img container not found");
  //     }
  //   }
  // }, [imgsLoaded]);

  const updateValueAndAdvanceFlow = (e: SyntheticEvent) => {
    e.preventDefault();
    const choice = e.currentTarget as HTMLInputElement;
    console.log("choice.value:", choice.value);
    // console.log('choice:', choice);

    const advFlowValue = document.getElementById(
      "advFlowValue",
    ) as HTMLInputElement;
    const advFlowSubmitBtn = document.getElementById(
      "advFlowSubmitBtn",
    ) as HTMLInputElement;

    if (advFlowValue as HTMLInputElement) {
      const advance = advFlowValue as HTMLInputElement;
      const target = e.target as HTMLInputElement;
      const value = target.value;

      advance.value = value;
    }

    advFlowSubmitBtn?.click();
  };

  const mappings = (charImgs: CharImgDurObjType[] | null) => {
    // stackSize is either the height of the image if moving horizontally, or
    // it's the width of the image if moving vertically. "stack" size meaning
    // the size in the direction of the image stacking to fit in the play area

    return;
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

  useEffect(() => {
    if (theme === "racing") {
      startMovingRightAnimation(0);
    }
  });

  const createMotionDivBasedOnTheme = () => {
    if (theme === "racing") {
      return (
        <Box component="form">
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionRight" + idNumber}
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
              id={"meImg" + idNumber}
              name={"meImg" + idNumber}
              className="image-btn-x"
              sx={{ width: "100%" }}
            >
              {charImg}
            </Button>
          </motion.div>
          <motion.div
            ref={dvMotionDiv}
            className="motion-div"
            id={"motionLeft" + idNumber}
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
              id={"meImg" + idNumber}
              name={"meImg" + idNumber}
              alt={"kaptcha answer option"}
              className="image-btn-x"
              type="image"
              src={img[1]}
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
          id={"motion" + idNumber}
          style={{ y }}
          // initial={{ y: yInitial }}
          animate={{
            y: yFinal,
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: duration,
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
            id={"meImg" + idNumber}
            name={"meImg" + idNumber}
            alt={"kaptcha image option"}
            className="backgroundImg"
            type="image"
            src={img}
          ></input>
        </motion.div>
      );
    }
  };

  return createMotionDivBasedOnTheme();
}
