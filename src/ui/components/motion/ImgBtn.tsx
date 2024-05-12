import Button, { type ButtonProps } from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha, styled } from "@mui/material/styles";
import Image from "next/image";

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

export interface KaptchaMeImgBtnProps extends ButtonProps {
  id: string;
  width?: string;
  src: string;
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

const kaptchaMeImgBtn = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== "width",
})<KaptchaMeImgBtnProps>(({ width, theme }) => ({
  ...(width && {
    // the overrides added when the new prop is used

    // color: theme.palette.success.main,
    // "& .MuiSlider-thumb": {
    //   [`&:hover, &.Mui-focusVisible`]: {
    //     boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
    //   },
    //   [`&.Mui-active`]: {
    //     boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
    //   },
    // },
    width: width,
  }),
}));

export default function ImgBtn(props: KaptchaMeImgBtnProps, img: typeof Image) {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
    >
      <ImageButton
        id={props.id}
        focusRipple
        key={props.title}
        style={{
          width: props.width,
        }}
      >
        <Image
          src={props.src}
          alt="kaptcha-me option"
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          width={500}
          height={300}
        />
        {/* <ImageSrc style={{ backgroundImage: `url(${props.src})` }} /> */}
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <ImageMarked className="MuiImageMarked-root" />
      </ImageButton>
    </Box>
  );
}
