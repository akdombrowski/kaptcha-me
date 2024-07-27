"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setSecureServerSideKookie } from "@/utils/kookies";

import createChallenges from "@/actions/createChallenges";
import type { GenerateChallengesRequestParams } from "@/actions/customFunction";

import dbClient, { updateChallenge } from "@/utils/db/supabase";
import supabse from "@supabase/supabase-js";
import { encrypt, sha512, compareHash } from "@/utils/db/encrypt";
import { aesDecrypt } from "@/utils/db/encrypt";

export default async function loginFormSubmit(formData: FormData) {
  const db = dbClient();
  const kookies = cookies();

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
    console.log("");
    console.log("setting difficult cookie...");
    console.log("");
    setSecureServerSideKookie(kookies, "difficulty", `${difficulty}`);
    switch (Number.parseInt(difficulty)) {
      case 0:
        numOptions = 3;
        imgSize = 35;
        break;
      case 1:
        numOptions = 9;
        imgSize = 25;
        break;
      case 2:
        numOptions = 20;
        imgSize = 20;
        break;
      default:
        numOptions = 11;
        imgSize = 25;
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
  const code = challenges.code;
  // Includes the SECRET CODE, don't return that to the client
  // just want renderings and themeSrc
  // but need to figure out how to store the code
  // TODO: Figure out how to store secret code
  // TODO: Encrypt and store in cookie, but need to think about what encryption
  // key to use and how to store that. Shouldn't use a single key for everyone
  console.log("...challenges received:");
  // console.log(challenges);
  console.log("");
  console.log("");

  // Set cookie

  console.log("");
  console.log("setting numOptions, imgSize cookies...");
  console.log("");
  const numOptsKookie = setSecureServerSideKookie(
    kookies,
    "numOptions",
    `${numOptions}`,
  );
  const imgSizeKookie = setSecureServerSideKookie(
    kookies,
    "imgSize",
    `${imgSize}`,
  );
  console.log("");
  console.log("");

  const { encrypted, aesKey, iv } = await encrypt(
    challenges.code,
    "utf8",
    "hex",
  );
  console.log();
  console.log("unencrypted challenge code:");
  console.log(code);
  console.log();
  console.log("encrypted challenge code:");
  console.log(encrypted);
  const decrypted = await aesDecrypt(encrypted, aesKey, iv);
  console.log();
  console.log("decrypted");
  console.log(decrypted);
  console.log();
  console.log("code === decrypted");
  console.log(code === decrypted);
  const hashed = sha512(encrypted);

  const { data, error } = await updateChallenge(db, email, new Date().toLocaleString("en-US"), hashed);

  console.log("db update challenge");
  console.log("data");
  console.log(data);
  console.log("error");
  console.log(error);




  console.log();
  console.log("hashed");
  console.log(hashed);
  console.log();
  console.log("compare hash");
  console.log(compareHash(encrypted, hashed));
  console.log();

  console.log("");
  console.log("");
  console.log("...");
  console.log("redirecting to /kaptchame");
  console.log("...");
  console.log("");
  console.log("");
  formData.forEach((value, key) => console.log(`${key}: ${value}`));
  console.log("");
  console.log("==============================");
  console.log("END loginformsubmit server action");
  console.log("==============================");
  console.log();

  redirect("/kaptchame");
  // return challenges.renderings;
}
