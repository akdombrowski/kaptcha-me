import createChallenges, { type GenerateChallengesRequestParams } from "@/actions/customFunction";
import loginFormSubmit from "@/actions/loginFormSubmit";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import BotDetection from "@/kaptchame/bd/BotDetection"


const DynamicBotDetection = dynamic(() => import("@/kaptchame/bd/BotDetection"), {
  ssr: false,
});

export default async function KaptchaMe() {
  const numOptions = cookies().get("numOptions")
  const imgSize = cookies().get("imgSize")
  if(numOptions && imgSize) {
    const options = Number.parseInt(numOptions.value);
    const size = Number.parseInt(imgSize.value);

    const createChallengeParams: GenerateChallengesRequestParams = {
      numOptions: options,
      imgSize: size,
      imgSizeRacing: size,
      theme: "racing",
    };
    const challenges = await createChallenges(createChallengeParams);
  }

  return <DynamicBotDetection />;
}
