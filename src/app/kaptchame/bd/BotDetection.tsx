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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<IContainerSize>({
    width: 1920,
    height: 1080,
  });
  const [renderings, setRenderings] = useState<Renderings>({
    0: { value: "", pos: 0, img: "" },
  });

  useEffect(() => {
    const stored = window.sessionStorage.getItem("renderings");
    if (!stored) return;

    try {
      setRenderings(JSON.parse(stored));
    } catch {
      // Corrupt storage → fail closed
      window.sessionStorage.removeItem("renderings");
    }
  }, []);

  const goKartAspectRatio = 100 / 68;
  const numOptions = 15;
  const formID = "formWrapperForBtns";

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize?.[0];

      setContainerSize({
        width: box?.inlineSize ?? entry.contentRect.width,
        height: box?.blockSize ?? entry.contentRect.height,
      });
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <ThemedBGContainer
      themeSrc={"https://i.postimg.cc/DzjCwcwW/race-Track.webp"}
      ref={containerRef}
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
