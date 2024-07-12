import "client-only";

// react
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

// kaptcha-me
import MotionCharacterImgBtn from "@/components/motion/MotionCharacterImgBtn";

// mui
import Box from "@mui/material/Box";


import type { IContainerSize } from "@/bd/BotDetection";
import { Renderings } from "@/actions/customFunction";

export interface IKaptchaMeFormProps {
  formID: string;
  children?: ReactNode;
  renderings: Renderings;
  imgSize: number;
  containerSize: IContainerSize;
}


export default function KaptchaMeForm(props: IKaptchaMeFormProps) {
  const [imgBtns, setImgBtns] = useState<ReactNode | null>(null);
  const { formID, renderings, containerSize, imgSize } = props;

  useEffect(() => {
    if (containerSize.width) {
      const charImgBtns = generateMotionCharacterImgBtns({
        renderings,
        containerSize,
      });
      setImgBtns(charImgBtns);
    }
  }, [containerSize]);

  const formAction = (formData: FormData) => {
    console.log();
    console.log("KaptchaMeForm -> formAction");

    const choiceName = formData.keys().next().value;
    const choiceValue = formData.values().next().value;
    console.log(choiceName);
    console.log(choiceValue);

    console.log("formAction");
    console.log();
  };

  const generateMotionCharacterImgBtns = (params: {
    containerSize: IContainerSize;
    renderings: Renderings;
  }): ReactNode => {
    const { containerSize, renderings } = params;

    const minDurMillis = 2000;
    const maxDurMillis = 30000;
    const maxAddRNDDurMillis = maxDurMillis - minDurMillis;
    const numOptions = Object.values(renderings).length;
    let chil = new Array(numOptions);

    // delay for countdown
    const delay = 3;

    for (let i = 0; i < chil.length; i++) {
      // This is the min. dur for a character to move across the screen
      const duration = parseFloat(
        Number(
          (Math.random() * maxAddRNDDurMillis) / 2 +
            (Math.random() * maxAddRNDDurMillis) / 2 +
            minDurMillis,
        ).toPrecision(5),
      )/1000;

      const id = `optionBtn-${i}`;
      chil[i] = (
        <MotionCharacterImgBtn
          id={id}
          formID={formID}
          height={imgSize}
          key={`optionBtn-${i}`}
          src={renderings[i].img}
          value={renderings[i].value}
          top={renderings[i].pos}
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
