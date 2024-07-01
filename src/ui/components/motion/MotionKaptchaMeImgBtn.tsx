import { forwardRef } from "react";
import type { SyntheticEvent } from "react";

import { alpha, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import type { ButtonProps } from "@mui/material/Button";
import type {
  ButtonBaseOwnProps,
  ButtonBaseProps,
} from "@mui/material/ButtonBase";

import Image from "next/image";

import { motion, useMotionValue } from "framer-motion";
import type { ForwardRefComponent, MotionProps } from "framer-motion";

import submitChoice from "@/actions/submitChoice";

export interface KaptchaMeImgBtnProps {
  id: string;
  width?: string;
}

export const KaptchaMeImgBtn = forwardRef((props: any, ref) => {
  const handleClick = (event: SyntheticEvent) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("handleClick");
    console.log(event);
    console.log("event.currentTarget");
    console.log(event.currentTarget);
    console.log("handleClick");
    console.log("calling formAction");
    const btnEl = event.currentTarget as HTMLButtonElement;
    btnEl.form?.requestSubmit();
    // props.formAction(event);
  };

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
        form={props.formID}
        formAction={submitChoice}
        className="btn"
        sx={{
          width: "100%",
          height: "100%",
        }}
        // onClick={handleClick}
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
