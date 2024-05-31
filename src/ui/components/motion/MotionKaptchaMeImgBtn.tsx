import Button, { type ButtonProps } from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";
import { forwardRef, type ForwardedRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { ForwardRefComponent, MotionProps } from "framer-motion";

import type {
  ButtonBaseOwnProps,
  ButtonBaseProps,
} from "@mui/material/ButtonBase";

const img = {
  url: "https://i.ibb.co/zm6cRTt/gokart-R.png",
  title: "kaptcha-me-gokart-r",
  width: "30%",
};

export interface KaptchaMeImgBtnProps {
  id: string;
  width?: string;
}

export const KaptchaMeImgBtn = forwardRef((props: any, ref) => {
  return (
    <Box
      className="motion-img-btn-box"
      ref={ref}
      minWidth={10}
      maxWidth="25vw"
      width={props?.width}
      height={props?.height}
      sx={{ aspectRatio: props.aspectRatio }}
    >

      {/* //TODO:
      * why isn't form attribute getting set?!?!?
      */}


      <ButtonBase
        id={props.id}
        form={props.formid}
        className="btn"
        sx={{
          width: "100%",
          height: "100%",
        }}
        onClick={props?.handleClick}
        type="submit"
      >
        <Box width="100%" height="100%" position="relative">
          <Image
            src={props.src}
            alt="kaptcha-me option"
            sizes="(max-width: 768px) 15vw, (max-width: 1200px) 25vw, 50vw"
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
});

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
