import createChallenges, {
  type GenerateChallengesRequestParams,
} from "@/actions/customFunction";
import { cookies } from "next/headers";
import BotDetection from "@/kaptchame/bd/BotDetection";

export default async function KaptchaMe() {
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
  const challenges = await createChallenges(createChallengeParams);
  const renderings = challenges.renderings;

  return <BotDetection renderings={renderings} imgSize={size} />;
}
