import { forwardRef } from "react";
import type { SyntheticEvent } from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import Image, { StaticImageData } from "next/image";

import { motion } from "framer-motion";

import submitChoice from "@/actions/submitChoice";

export interface KaptchaMeImgBtnProps {
  id: string;
  width?: string;
  height?: string;
  aspectRatio: number;
  formAction?: (event: SyntheticEvent<Element, Event>, data: any) => void;
  formID: string;
  src: string | StaticImageData;
  value: string;
  top: number;
}

export const KaptchaMeImgBtn = forwardRef(
  (props: KaptchaMeImgBtnProps, ref) => {
    const { width, height, value, aspectRatio, id, src, top } = props;

    const handleClick = (event: SyntheticEvent) => {
      console.log();
      console.log("MotionKaptchaMeImgBtn -> handleClick");
      event.preventDefault();
      // console.log(event.nativeEvent);
      // console.log(event);
      // console.log(event.currentTarget as HTMLElement);
      console.log("id");
      console.log(event.currentTarget.id);
      console.log("calling formAction");
      const btnEl = event.currentTarget as HTMLButtonElement;
      console.log();
      btnEl.form?.requestSubmit(event.currentTarget as HTMLElement);
      console.log();
      console.log("handleClick");
      console.log();
    };

    return (
      <Box
        className="motion-img-btn-box"
        ref={ref}
        minWidth={10}
        maxWidth="25vw"
        width={props?.width}
        height={props?.height}
        position="absolute"
        sx={{ aspectRatio: props.aspectRatio, top: `${top}%` }}
      >
        <ButtonBase
          id={props.id}
          name={`chooze-me-${id}`}
          value={value}
          className="btn"
          sx={{
            width: "100%",
            height: "100%",
          }}
          onClick={handleClick}
          type="submit"
        >
          <Box width="100%" height="100%" position="relative">
            <Image
              src={props.src}
              alt="kaptcha-me option"
              sizes="35vw"
              quality={100}
              priority={false}
              fill
              style={{
                objectFit: "contain",
                overflow: "hidden",
              }}
            />
          </Box>
        </ButtonBase>
      </Box>
    );
  },
);

export const MotionKaptchaMeImgBtn = motion(KaptchaMeImgBtn, {
  forwardMotionProps: true,
});

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

export default MotionKaptchaMeImgBtn;
