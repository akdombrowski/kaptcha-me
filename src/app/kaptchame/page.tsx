import dynamic from "next/dynamic";

const DynamicBotDetection = dynamic(() => import("./bd/BotDetection"), {
  ssr: false,
});

export default function Page() {
  return <DynamicBotDetection />;
}
