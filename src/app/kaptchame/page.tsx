import createChallenges, {
  type GenerateChallengesRequestParams,
} from "@/actions/customFunction";
import { cookies } from "next/headers";

import dynamic from "next/dynamic";

const DynamicBD = dynamic(() => import("@/kaptchame/bd/BotDetection"));
export default async function KaptchaMePage() {
  const kookies = await cookies();
  const numOptions = kookies.get("numOptions");
  const imgSize = kookies.get("imgSize");
  const options = numOptions ? Number.parseInt(numOptions.value) : 5;
  const size = imgSize ? Number.parseInt(imgSize.value) : 21;

  return <DynamicBD imgSize={size} />;
}
