"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import createChallenges from "@/actions/createChallenges";
import type { GenerateChallengesRequestParams } from "@/actions/customFunction";

export default async function loginFormSubmit(formData: FormData) {
  console.log("");
  console.log("");
  console.log("");
  console.log("==============================");
  console.log("START loginformsubmit server action");
  console.log("==============================");
  console.log("");

  const email = formData.get("email");
  const password = formData.get("password");
  const difficulty = formData.get("difficulty")?.valueOf();

  console.log("");
  console.log("requesting new challenges...");
  console.log("");
  let numOptions = 10;
  let imgSize = 10;
  if (difficulty && typeof difficulty === "string") {
    switch (Number.parseInt(difficulty)) {
      case 0:
        numOptions = 3;
        imgSize = 25;
        break;
      case 1:
        numOptions = 9;
        imgSize = 10;
        break;
      case 2:
        numOptions = 20;
        imgSize = 6;
        break;
      default:
        numOptions = 11;
        imgSize = 9;
        break;
    }
  }

  const createChallengeParams: GenerateChallengesRequestParams = {
    numOptions,
    imgSize,
    imgSizeRacing: imgSize,
    theme: "racing",
  };
  const challenges = await createChallenges(createChallengeParams);
  // Includes the SECRET CODE, don't return that to the client
  // just want renderings and themeSrc
  // but need to figure out how to store the code
  // TODO: Figure out how to store secret code
  // TODO: Encrypt and store in cookie, but need to think about what encryption
  // key to use and how to store that. Shouldn't use a single key for everyone
  console.log("...challenges received:");
  console.log(challenges);
  console.log("");
  console.log("");

  // Set cookie
  cookies().set("numOptions", `${numOptions}` );
  cookies().set("imgSize", `${imgSize}` );
  console.log("");
  console.log("");
  console.log(
    "renderings character length:",
    JSON.stringify(challenges.renderings).length,
  );

  console.log("");
  console.log("");
  console.log("redirecting to /kaptchame");
  console.log("");
  console.log("");
  formData.forEach((value, key) => console.log(`${key}: ${value}`));
  console.log("");
  console.log("==============================");
  console.log("END loginformsubmit server action");
  console.log("==============================");
  console.log("");
  console.log("");
  console.log("");

  redirect("/kaptchame");
  // return challenges.renderings;
}
