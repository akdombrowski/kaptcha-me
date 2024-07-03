import { forwardRef } from "react";
import type { SyntheticEvent } from "react";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

import Image from "next/image";

import { motion } from "framer-motion";

import submitChoice from "@/actions/submitChoice";

export interface KaptchaMeImgBtnProps {
  id: string;
  width?: string;
  formAction?: () => Promise<any>;
}

export const KaptchaMeImgBtn = forwardRef((props: any, ref) => {
  const handleClick = (event: SyntheticEvent) => {
    console.log("handleClick");
    event.preventDefault();
    // console.log(event.nativeEvent);
    // console.log(event);
    console.log(event.currentTarget as HTMLElement);
    console.log("id");
    console.log(event.currentTarget.id);
    console.log("calling formAction");
    const btnEl = event.currentTarget as HTMLButtonElement;
    btnEl.form?.requestSubmit(event.currentTarget as HTMLElement);
    console.log("handleClick");
  };
  const updateWithID = submitChoice.bind(null, props.id);

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
      <ButtonBase
        id={props.id}
        name={"here's the name of the key"}
        value={"value of the key"}
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