import MotionCharacterImgBtn from "@/components/motion/MotionCharacterImgBtn";

import Box from "@mui/material/Box";

import { useEffect, useState, useRef } from "react";

import type { ReactNode, SyntheticEvent } from "react";

import kmGoKartR from "#/gokart/r/gokart-R.png";
import kmGoKartL from "#/gokart/l/gokart-L.png";

export interface IKaptchaMeFormProps {
  formAction: () => {};
  formID: string;
  children: ReactNode;
  numOptions: number;
  containerSize: number;
}

const kmTheme = "racing";
// const kmGoKartR = "/me/gokart/r/gokart-R.png";
// const kmGoKartL = "/me/gokart/l/gokart-L.png";

export default function KaptchaMeForm(props: IKaptchaMeFormProps) {
  const [imgBtns, setImgBtns] = useState<MotionCharacterImgBtn[] | null>(null);
  const { formID, children, numOptions, containerSize } = props;

  useEffect(() => {
    if (containerSize.width) {
      const charImgBtns = generateMotionCharacterImgBtns({
        numOptions,
        containerSize,
      });
      setImgBtns(charImgBtns);
    }
  }, [containerSize]);


  const formAction = (event: SyntheticEvent) => {
    console.log("formAction")

    console.log(event);

    console.log("event.currentTarget")
    console.log(event.currentTarget)
    console.log("formAction")

  };

  const generateMotionCharacterImgBtns = (params: {
    numOptions: number;
    containerSize: IContainerSize;
  }) => {
    const { numOptions, containerSize } = params;

    const maxVelocity = 100;
    const minVelocity = 35;
    const minDur = containerSize.width / maxVelocity;
    const maxDur = containerSize.width / minVelocity;
    // ${maxAddRNDDur} + ${minDur} = the max dur for a character to move across the screen
    const maxAddRNDDur = maxDur - minDur;

    let chil = new Array(numOptions);
    let heightPerBtn = 1 / numOptions;
    const delay = 3;

    for (let i = 0; i < chil.length; i++) {
      // This is the min. dur for a character to move across the screen
      const maxDurSecondsMotionOffset = Math.ceil(containerSize.width);
      // Haven't tested thoroughly, but hopefully using 2x rnd fn calls will create a
      // little more variability
      const duration = parseFloat(
        Number(
          (Math.random() * maxAddRNDDur) / 2 +
            (Math.random() * maxAddRNDDur) / 2 +
            minDur,
        ).toPrecision(2),
      );

      const id = `optionBtn-${i}`;
      chil[i] = (
        <MotionCharacterImgBtn
          id={id}
          formID={formID}
          formAction={formAction}
          height={heightPerBtn}
          key={`optionBtn-${i}`}
          src={kmGoKartR}
          containerSize={containerSize}
          aspectRatio={100 / 68}
          duration={duration}
          delay={delay}
        />
      );
    }
    return chil;
  };

  return (
    <Box
      height="100%"
      width="100%"
      component="form"
      action={formAction}
      name={formID}
    >
      {imgBtns}
    </Box>
  );
}
