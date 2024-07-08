import "client-only";

// react
import { useEffect, useState, useRef } from "react";
import type { ReactNode, SyntheticEvent } from "react";
// kaptcha-me
import MotionCharacterImgBtn from "@/components/motion/MotionCharacterImgBtn";
// mui
import Box from "@mui/material/Box";

// local images
import kmGoKartR from "@/gokart/r/gokart-R.png";
import kmGoKartL from "@/gokart/l/gokart-L.png";
// actions
import { getNewChallenges } from "@/actions/createChallenges";

import type { IContainerSize } from "@/bd/BotDetection";
import submitChoice from "@/actions/submitChoice";
import { Renderings } from "@/actions/customFunction";

export interface IKaptchaMeFormProps {
  formID: string;
  children?: ReactNode;
  renderings: Renderings;
  imgSize: number;
  containerSize: IContainerSize;
  formAction?: () => {};
}

const kmTheme = "racing";
// const kmGoKartR = "/me/gokart/r/gokart-R.png";
// const kmGoKartL = "/me/gokart/l/gokart-L.png";

export default function KaptchaMeForm(props: IKaptchaMeFormProps) {
  const [imgBtns, setImgBtns] = useState<ReactNode | null>(null);
  const { formID, children, renderings, containerSize, imgSize } = props;

  useEffect(() => {
    if (containerSize.width) {
      const charImgBtns = generateMotionCharacterImgBtns({
        renderings,
        containerSize,
      });
      setImgBtns(charImgBtns);
    }
  }, [containerSize]);

  const formAction = (formData) => {
    console.log("inside KaptchaMeForm formAction");

    // console.log(event);

    console.log("formData");
    console.log(formData);

    console.log("");
    // const challenges = getNewChallenges();
    console.log("");
    console.log("formAction");
  };

  const generateMotionCharacterImgBtns = (params: {
    containerSize: IContainerSize;
    renderings: Renderings;
  }): ReactNode => {
    const { containerSize, renderings } = params;

    const maxVelocity = 150;
    const minVelocity = 35;
    const minDur = containerSize.width / maxVelocity;
    const maxDur = containerSize.width / minVelocity;
    // ${maxAddRNDDur} + ${minDur} = the max dur for a character to move across the screen
    const maxAddRNDDur = maxDur - minDur;
    const numOptions = Object.values(renderings).length;
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
          formAction={submitChoice}
          height={imgSize}
          key={`optionBtn-${i}`}
          src={renderings[i].img}
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
      {imgBtns ?? <></>}
    </Box>
  );
}
