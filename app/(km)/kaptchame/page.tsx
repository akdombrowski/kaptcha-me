'use client';

import dynamic from 'next/dynamic';

const DynamicBotDetection = dynamic(() => import('./app/BotDetection'), {
  ssr: false,
});

export default function Page() {
  return <DynamicBotDetection />;
}
