import createChallenges, {
  type GenerateChallengesRequestParams,
} from "@/actions/customFunction";
import { cookies } from "next/headers";

import dynamic from "next/dynamic";

const DynamicBD = dynamic(() => import("@/kaptchame/bd/BotDetection"), {
  ssr: false,
});
export default async function KaptchaMePage() {
  const numOptions = cookies().get("numOptions");
  const imgSize = cookies().get("imgSize");
  const options = numOptions ? Number.parseInt(numOptions.value) : 5;
  const size = imgSize ? Number.parseInt(imgSize.value) : 21;

  const createChallengeParams: GenerateChallengesRequestParams = {
    numOptions: options,
    imgSize: size,
    imgSizeRacing: size,
    theme: "racing",
  };

  //TODO:GRAB CHALLENGES FROM LOGINFORMSUBMIT.TS
  const challenges = await createChallenges(createChallengeParams);
  const renderings = challenges.renderings;

  return <DynamicBD renderings={renderings} imgSize={size} />;
}
