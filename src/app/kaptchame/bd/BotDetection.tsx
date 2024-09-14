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

"use client";
import "client-only";

// react
import { useEffect, useState, useRef } from "react";
import ThemedBGContainer from "@/components/ThemedBGContainer";
import KaptchaMeForm from "@/app/kaptchame/bd/KaptchaMeForm";

import type { MotionValue } from "framer-motion";

import type { Challenges, Renderings } from "@/actions/customFunction";

export interface BotDetectionProps {
  imgs: string[];
  dur: string | number;
  numChoices: number;
  challenges?: Challenges;
}

export interface MotionValuesObj {
  [key: string]: MotionValue;
}

export interface IContainerSize {
  width: number;
  height: number;
}

export default function BotDetection({ imgSize }: { imgSize: number }) {
  const themedBGContainerRef = useRef<typeof ThemedBGContainer | null>(null);
  const [containerSize, setContainerSize] = useState<IContainerSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [renderings, setRenderings] = useState<Renderings>({
    0: { value: "", pos: 0, img: "" },
  });

  useEffect(() => {
    if (window) {
      const renderings = window.sessionStorage.getItem("renderings");

      if (renderings) {
        setRenderings(JSON.parse(renderings) as Renderings);
      }
    }
  }, []);

  const goKartAspectRatio = 100 / 68;
  const numOptions = 15;
  const formID = "formWrapperForBtns";

  const createResizeObserver = () => {
    return new ResizeObserver((entries: ResizeObserverEntry[]) => {
      let width, height;
      for (const entry of entries) {
        // borderBoxSize is newer and preferred but may not be supported on all
        // browsers like the older contentRect is likely to be
        if (entry.borderBoxSize) {
          width = entry.borderBoxSize[0].inlineSize;
          height = entry.borderBoxSize[0].blockSize;
        } else {
          width = entry.contentRect.width;
          height = entry.contentRect.height;
        }
      }
      setContainerSize({ width, height });
    });
  };

  const resizeObserver = createResizeObserver();

  useEffect(() => {
    if (window) {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [window]);

  useEffect(() => {
    if (themedBGContainerRef.current) {
      resizeObserver.observe(themedBGContainerRef.current as unknown as Element);

      return () => resizeObserver.disconnect();
    }
  }, [themedBGContainerRef]);

  return (
    <ThemedBGContainer
      themeSrc={"https://i.postimg.cc/DzjCwcwW/race-Track.webp"}
      ref={themedBGContainerRef}
      containerSize={containerSize}
    >
      <KaptchaMeForm
        formID={formID}
        renderings={renderings}
        imgSize={imgSize}
        containerSize={containerSize}
      />
    </ThemedBGContainer>
  );
}
