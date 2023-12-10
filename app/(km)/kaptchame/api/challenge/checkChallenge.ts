import { NextRequest, NextResponse } from 'next/server';
// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.
import 'server-only';

type CheckChallengeReqBody = {
  challenge: string;
};

export async function POST(request: NextRequest): Promise<Response> {
  const body = request.body as unknown as CheckChallengeReqBody;
  const challenge = body.challenge;
  let isChallengeCorrect = false;

  if (!challenge) {
    return NextResponse.error();
  }

  return NextResponse.json({
    isCorrect: true,
  });
}
