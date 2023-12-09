'use client';

import { ExternalLink } from '#/ui/external-link';
import BotDetection from './app/BotDetection';

export default function Page() {
  return (
    <div className="container">
      <div className="prose prose-sm prose-invert w-100">
        <h1 className="text-xl font-bold">Kaptcha Me Bot Detection</h1>
      </div>
      <BotDetection />
    </div>
  );
}
