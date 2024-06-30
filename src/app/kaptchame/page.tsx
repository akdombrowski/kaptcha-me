import dynamic from "next/dynamic";

const DynamicBotDetection = dynamic(() => import("@/kaptchame/bd/BotDetection"), {
  ssr: false,
});

export default function KaptchaMe() {
  return <DynamicBotDetection />;
}
