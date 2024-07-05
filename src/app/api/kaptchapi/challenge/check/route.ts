`server-only`;
// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's

import "server-only";
// good practise to add `server-only` preemptively.

import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import GetChallenges from "../readChallenges/route";
import createChallenges from "@/actions/customFunction";

type CheckChallengeReqBody = {
  challenge: string;
};

export const checkChallenge = async (formData: FormData) => {
  const challenge = formData.get("challenge");
  const challenges = await GetChallenges();

  console.log("");
  console.log("in checkChallenge API route");

  console.log("");
  console.log("challenge:");
  console.log(challenge);
  console.log("challenges:");
  console.log(challenges);

  // mutate data
  // revalidate cache
};

export async function GET(request: NextRequest) {
  console.log("");
  console.log("Inside GET on kaptchapi/challenge/check route handler");
  console.log("");
  console.log("request");
  console.log(request.url);

  // TODO: redirect to the page being protected by the katpchame bot detection
  return NextResponse.json("good", { status: 200 });
}

export async function POST(request: NextRequest) {
  const submittedFormData = await request.formData();
  let isChallengeCorrect = false;

  console.log("");
  console.log("==================");
  console.log("==================");
  console.log("==================");
  console.log("");
  console.log("      IN POST");
  console.log("");
  console.log("==================");
  console.log("==================");
  console.log("==================");
  console.log("in POST function capture in kaptchapi/challenge/check");

  console.log("");
  // for (const datum of submittedFormData) {
  //   console.log(datum);
  // }
  console.log("");
  // console.log("submittedFormData:");
  // console.log(submittedFormData);
  console.log("");

  console.log("");
  // console.log("request.url:");
  // console.log(request.url);
  // for testing creating data
  console.log("");
  console.log("fetch start");
  const createRes = await fetch(
    new URL("/api/kaptchapi/challenge/create", request.url),
  );
  console.log("fetch over");
  console.log("");
  console.log("");
  console.log("");
  const createResJSON = await createRes.json();
  // console.log("createResJSON");
  // console.log(createResJSON);

  console.log("");
  console.log("");
  console.log("");
  console.log("");

  // make sure a challenge was sent
  const wasChallengeSubmitted = submittedFormData.has("challenge");
  if (!wasChallengeSubmitted) {
    console.log("no challenge submitted");
    return NextResponse.error();
  }
  const challenge = submittedFormData.get("challenge");
  console.log("");
  // console.log("challenge");
  // console.log(challenge);
  console.log("");

  // TODO: Check challenge
  // if (challenge === true) {
  //   redirect('https://nextjs.org/')
  // }

  const kaptchameURL = new URL("/kaptchame", request.url);
  console.log('new URL("/kaptchame", request.url)');
  console.log(kaptchameURL);
  console.log("");

  // TODO: redirect to the page being protected by the katpchame bot detection
  return NextResponse.redirect(kaptchameURL);
  // return NextResponse.json("good", { status: 200 });
}
