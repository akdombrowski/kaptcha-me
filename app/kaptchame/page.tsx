'use client';

import { ExternalLink } from '#/ui/external-link';
import BotDetection from './app/BotDetection';

export default function Page() {
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      <h1 className="text-xl font-bold">Kaptcha Me Bot Detection</h1>

      <BotDetection />
    </div>
  );
}
