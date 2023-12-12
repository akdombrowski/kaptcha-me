import 'server-only';

import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation'
import GetChallenges from "../get/route";
// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.

type CheckChallengeReqBody = {
  challenge: string;

};

 export const checkChallenge = async (formData: FormData) => {
   "use server";

   const challenge = formData.get("challenge");
   const challenges = await GetChallenges();

   console.log("challenge:");
   console.log(challenge);
   console.log("challenges:");
   console.log(challenges);

   // mutate data
   // revalidate cache
 };

export async function POST(request: NextRequest) {
  const body = request.formData();
  // const challenge = body.challenge;
  let isChallengeCorrect = false;

  console.log('body:', body);

  // if (!challenge) {
  //   return NextResponse.error();
  // }

  // if (challenge === true) {
  //   redirect('https://nextjs.org/')
  // }
}
