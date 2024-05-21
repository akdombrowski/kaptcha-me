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

// TODO: Build Image Button Component
/**
 * The idea is to use the custom button as shown in the "complex button" example
 * on MUI
 *
 * https://mui.com/material-ui/react-button/#complex-button
 */

const img = {
  url: "https://i.ibb.co/zm6cRTt/gokart-R.png",
  title: "kaptcha-me-gokart-r",
  width: "30%",
};

const ImageSrc = styled("span")({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: "cover",
  backgroundPosition: "center 40%",
});

const BtnImage = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

const ImageMarked = styled("span")(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: "absolute",
  bottom: -2,
  left: "calc(50% - 9px)",
  transition: theme.transitions.create("opacity"),
}));

export interface KaptchaMeImgBtnProps {
  id: string;
  width?: string;
}

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  height: 200,
  [theme.breakpoints.down("sm")]: {
    width: "100% !important", // Overrides inline-style
    height: 100,
  },
  "&:hover, &.Mui-focusVisible": {
    zIndex: 1,
    "& .MuiImageBackdrop-root": {
      opacity: 0.15,
    },
    "& .MuiImageMarked-root": {
      opacity: 0,
    },
    "& .MuiTypography-root": {
      border: "4px solid currentColor",
    },
  },
}));

const NextImageSrc = styled(Image, {
  shouldForwardProp: (prop) => prop !== "width",
})<KaptchaMeImgBtnProps>(({ width, theme }) => ({
  ...(width && {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  }),
}));

const StyledKaptchaMeImgBtn = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "width",
})<KaptchaMeImgBtnProps>(({ width, theme }) => ({
  ...(width && {
    width: width,
  }),
}));

const kmImgBtn = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "width",
})<KaptchaMeImgBtnProps>(({ width, theme }) => ({
  ...(width && {
    width: width,
  }),
}));
export const KaptchaMeImgBtn = forwardRef((props: any, ref) => {
  return (
    <Box
      className="motion-img-btn"
      ref={ref}
      minWidth={10}
      maxWidth="25vw"
      width={props?.width}
      height={props?.height}
    >
      <ButtonBase
        id={props.id}
        className="btn"
        sx={{
          width: "100%",
          height: "100%",
        }}
        onClick={props?.handleClick}
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

export const ImgBtn = forwardRef((props: any, ref) => {
  return (
    <Box
      className="motion-img-btn"
      ref={ref}
      minWidth={10}
      maxWidth="25vw"
      width={props?.width}
      height={props?.height}
    >
      <StyledKaptchaMeImgBtn
        id={props.id}
        className="btn"
        sx={{
          width: "100%",
        }}
        onClick={props?.handleClick}
      >
        <Box width="100%" height="100%" position="relative">
          <Image
            src={props.src}
            alt="kaptcha-me option"
            sizes="(max-width: 768px) 1vw, (max-width: 1200px) 10vw, 15vw"
            fill
            style={{
              objectFit: "cover",
              overflow: "hidden",
            }}
          />
        </Box>
      </StyledKaptchaMeImgBtn>
    </Box>
  );
});

const MotionImgBtn = motion(ImgBtn, { forwardMotionProps: true });

export default MotionImgBtn;
