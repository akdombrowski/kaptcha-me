"use client";

import "client-only";

/* eslint-disable jsx-a11y/anchor-is-valid */
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import MotionContainer from "./MotionContainer";
import testrenderings from "./TestRenderings";
import { checkChall } from "./actions";

// for local dev
const DV_IMG_SIZE = 5;
const DV_IMG_SIZE_RACING = 11;
const NUMBER_OF_DAVINCIS = 9;
const DV_IMG_WIDTH_VW = DV_IMG_SIZE.toString() + "vw";
const DV_IMG_HEIGHT_VH = DV_IMG_SIZE.toString() + "vh";
// const DV_IMG_SIZE = Number("{{global.variables.DV_IMG_SIZE}}");
// const DV_IMG_SIZE_RACING = Number("{{global.variables.DV_IMG_SIZE_RACING}}");
// const NUMBER_OF_DAVINCIS = Number("{{global.variables.difficulty}}");
// const RENDERINGS = document.getElementById('renderings')?.innerText;
const RENDERINGS = testrenderings;
const MIN_DUR = 4;
const MAX_DUR = 8;

// for local dev
const theme = "racing";
// const bgImg = "https://i.ibb.co/yWrB3tt/anthony-double-trouble.png";
const bgImg = "https://i.postimg.cc/DzjCwcwW/race-Track.webp";
// const theme = "{{global.variables.theme}}";
// const bgImg = "{{global.variables.themeSrc}}";

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
const generateDurations = (): number[] => {
  const dvs: number[] = [];
  let min = MIN_DUR;
  let max = MAX_DUR;
  if (theme.startsWith("racing")) {
    min = 5;
    max = 25;
  }

  for (let i = 0; i < NUMBER_OF_DAVINCIS; i++) {
    const duration = Math.random() * (max - min) + min;

    dvs.push(duration);
  }

  return dvs;
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

const precacheImage = (
  imgsSet: Set<string>,
  imgSrc: string,
  proms: Promise<string>[],
) => {
  const img = new Image();
  imgsSet.add(imgSrc);
  proms.push(
    new Promise<string>((resolve, reject) => {
      img.onload = () => {
        console.log(imgSrc, "loaded");
        resolve("loaded: " + imgSrc);
      };
      img.onerror = () => {
        console.log(imgSrc, "loading failed");
        reject("loading failed for image: " + imgSrc);
      };
    }),
  );

  img.src = imgSrc;
  img.loading = "eager";
  return { imgsSet, proms };
};

const precacheBGImage = (bgImg: string) => {
  const imgsSet = new Set<string>();
  let proms: Promise<string>[] = [];

  ({ proms } = precacheImage(imgsSet, bgImg, proms));

  return proms;
};

const precacheAllImagesNeeded = () => {
  if (!renderings) {
    throw new Error("didn't get renderings info");
  }

  let proms: Promise<string>[] = [];
  let imgsSet = new Set<string>();

  for (const r of Object.values(renderings)) {
    if (theme.startsWith("racing")) {
      const img0 = r.img[0];
      const img1 = r.img[1];

      if (!imgsSet.has(img0)) {
        ({ imgsSet, proms } = precacheImage(imgsSet, img0, proms));
      }
      if (!imgsSet.has(img1)) {
        ({ imgsSet, proms } = precacheImage(imgsSet, img1, proms));
      }
    } else {
      if (!imgsSet.has(r.img)) {
        ({ imgsSet, proms } = precacheImage(imgsSet, r.img, proms));
      }
    }
  }

  return proms;
};

function BotDetection() {
  const [bgImgLoaded, setBGImgLoaded] = useState(false);
  const [imgsLoaded, setImgsLoaded] = useState(false);
  const [bgImageContainerHeight, setBgImageContainerHeight] = useState(0);
  const [bgImageContainerWidth, setBgImageContainerWidth] = useState(0);
  const mainContainerRef = useRef<HTMLDivElement | null>(null);
  const dvContainers = generateDurations();

  // const checkChallenge = async (formData: FormData) => {
  //   // e.preventDefault()
  //   const body = new FormData()
  //   console.log("formData");
  //   console.log(formData);
  //   body.append("challenge", formData.get("challenge") as string)

  //   console.log();
  //   console.log("body");
  //   console.log(body);

  //   await fetch("kaptchapi/checkChallenge", {
  //     cache: 'no-store', method: "POST", body })
  // }

  const waitForBGImage = async () => {
    await Promise.all(precacheBGImage(bgImg));
    setBGImgLoaded(true);
  };

  const waitForImages = async () => {
    await Promise.all(precacheAllImagesNeeded());
    setImgsLoaded(true);
  };

  useEffect(() => {
    waitForBGImage();
  }, []);

  useEffect(() => {
    waitForImages();
  }, [bgImgLoaded]);

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

  useEffect(() => {
    if (imgsLoaded) {
      if (mainContainerRef?.current) {
        const curr = mainContainerRef.current as HTMLDivElement;
        resizeObserver.observe(curr);
        return () => {
          resizeObserver.unobserve(curr);
        };
      } else {
        console.error("main bg img container not found");
      }
    }
  }, [imgsLoaded]);

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

  const mappingDVs = (dvContainers: number[]) => {
    // stackSize is either the height of the image if moving horizontally, or
    // it's the width of the image if moving vertically. "stack" size meaning
    // the size in the direction of the image stacking to fit in the play area
    const stackSize = Math.floor(100 / dvContainers.length);
    const movementSize = (stackSize * 16) / 9;

    return (
      <>
        {dvContainers.map((dur, i) => {
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

          const props: motioncontainerprops = {
            idNumber: i,
            duration: dur,
            challenge: challenge,
            img: img,
            handleClick: updateValueAndAdvanceFlow,
            imgsLoaded: imgsLoaded,
            bgImageContainerHeight: bgImageContainerHeight,
            bgImageContainerWidth: bgImageContainerWidth,
            theme: theme,
            imgStackSize: stackSize,
            movementSize: movementSize,
            moveDir: moveDir,
          };

          return (
            <div
              id={"imgCol" + i}
              key={"imgCol" + i}
              className={rowOrClass}
              data-id-number={i}
              data-duration={dur}
              data-imgs-loaded={imgsLoaded}
              data-bg-image-container-height={bgImageContainerHeight}
              data-bg-image-container-width={bgImageContainerWidth}
              data-img-size={stackSize}
            >
              <form
                id={"kaptcha-dv-form" + i}
                key={"kaptcha-dv-form" + i}
                className="form"
                method="POST"
                action={checkChall}
                noValidate
              >
                <input
                  type="hidden"
                  id={"chall" + i}
                  name={"challenge"}
                  value={challenge}
                />
                {MotionContainer(props)}
              </form>
            </div>
          );
        })}
      </>
    );
  };

  const calcFlexDirection = () => {
    if (theme.startsWith("racing")) {
      return "horizontal-scene";
    } else {
      return "vertical-scene";
    }
  };

  return (
    <div
      id="mainContainer"
      ref={mainContainerRef}
      className="main-container sceneImg"
      style={bgImgLoaded ? { backgroundImage: "url(" + bgImg + ")" } : {}}
    >
      <h1 style={bgImgLoaded ? { display: "none" } : {}}>Loading...</h1>
      <div id="dvsContainer" className={calcFlexDirection()}>
        {mappingDVs(dvContainers)}
      </div>
    </div>
  );
}

export default BotDetection;
