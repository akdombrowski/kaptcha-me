"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setSecureServerSideKookie } from "@/utils/kookies";
import createChallenges from "@/actions/createChallenges";
import dbClient, {
  fetchChallenge,
  fetchSeshID,
  updateChallenge,
  updateSeshID,
} from "@/utils/db/supabase";
import supabse from "@supabase/supabase-js";
import { encrypt, sha512, compareHash, createSeshID } from "@/utils/encrypt";
import { aesDecrypt } from "@/utils/encrypt";
import type {
  Challenges,
  GenerateChallengesRequestParams,
} from "@/actions/customFunction";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { SupabaseClient } from "@supabase/supabase-js";
import { FormEvent } from "react";

const setKookies = async (props: {
  email: string;
  numOptions: number;
  imgSize: number;
  seshID: string;
}) => {
  const { email, numOptions, imgSize, seshID } = props;
  const kookies = cookies();

  // Set cookie
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

  const seshIDKookie = setSecureServerSideKookie(
    kookies,
    "seshID",
    `${seshID}`,
  );
};

export const generateChallenges = async (props: {
  kookies: ReadonlyRequestCookies;
  db: SupabaseClient;
  numOptions: number;
  imgSize: number;
  theme?: string;
  email: string;
}) => {
  const { kookies, db, numOptions, imgSize, theme, email } = props;
  const createChallengeParams: GenerateChallengesRequestParams = {
    numOptions,
    imgSize,
    imgSizeRacing: imgSize,
    theme: theme ?? "racing",
  };

  // Includes the SECRET CODE, don't return that to the client
  // just want renderings and themeSrc
  // but need to figure out how to store the code
  const challenges = await createChallenges(createChallengeParams);
  const renderings = challenges.renderings;
  console.log();
  console.log("renderings stringified");
  console.log(JSON.stringify(renderings));
  console.log();
  setSecureServerSideKookie(kookies, "renderings", JSON.stringify(renderings));

  const code = challenges.code;

  const { encrypted, aesKey, iv } = await encrypt(
    challenges.code,
    "utf8",
    "hex",
  );
  const decrypted = await aesDecrypt(encrypted, aesKey, iv);
  const hashed = sha512(encrypted);
  console.log("unencrypted challenge code:");
  console.log(code);
  console.log();
  console.log("encrypted challenge code:");
  console.log(encrypted);
  console.log();
  console.log("hashed");
  console.log(hashed);

  if (!compareHash(encrypted, hashed)) {
    console.log("");
    console.log("==============================");
    console.log("START loginformsubmit -> generateChallenges ");
    console.log("==============================");
    console.log("");
    console.log();
    console.log("unencrypted challenge code:");
    console.log(code);
    console.log();
    console.log("encrypted challenge code:");
    console.log(encrypted);
    console.log("");
    console.log();
    console.log("hashed");
    console.log(hashed);
    console.log();
    console.log("compare hash");
    console.log();
  }

  const { data, error } = await updateChallenge(
    db,
    email,
    new Date().toLocaleString("en-US"),
    hashed,
  );
  if (error) {
    console.log("db update challenge");
    console.log("data");
    console.log(data);
    console.log("error");
    console.log(error);
    throw new Error("error storing challenge in db", { cause: error });
  }

  console.log("");
  console.log("==============================");
  console.log("END loginformsubmit -> generateChallenges ");
  console.log("==============================");
  console.log("");

  return challenges;
};

export default async function loginFormSubmit(formData: FormData) {
  console.log("");
  console.log("==============================");
  console.log("START loginformsubmit server action");
  console.log("==============================");
  console.log("");

  const db = dbClient();
  const kookies = cookies();

  const email = formData.get("email")!;
  const password = formData.get("password");
  const difficulty = formData.get("difficulty")?.valueOf();
  if (!email || !password || !difficulty) {
    formData.forEach((value, key) => console.log(`${key}: ${value} \n`));
  }

  let numOptions = 10;
  let imgSize = 10;
  if (difficulty && typeof difficulty === "string") {
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

  let renderings;
  try {
    const challenges = await generateChallenges({
      kookies,
      db,
      numOptions,
      imgSize,
      theme: "racing",
      email: email.toString(),
    });

    renderings = challenges.renderings;
  } catch (error) {
    console.error("Failed to generate challenges", error);
  }

  console.log("");
  const { seshID, createdAt } = createSeshID({ username: email.toString() });
  const { data: dataSesh, error: errorSesh } = await updateSeshID(
    db,
    email,
    createdAt,
    seshID,
  );

  if (errorSesh) {
    console.log("");
    console.log("------------------------------");
    console.log("db session id update");
    console.log("------------------------------");
    console.log("");
    console.log("db update seshID");
    console.log("data");
    console.log(dataSesh);
    console.log("error");
    console.log(errorSesh);
    console.log("");
    console.log("------------------------------");
    console.log("db session id update");
    console.log("------------------------------");
    console.log("");
  }

  await setKookies({ email: email.toString(), numOptions, imgSize, seshID });
  const { challenge, response } = await fetchChallenge(db, email);
  if (!challenge) {
    console.log("------------------------------");
    console.log("START fetch challenge");
    console.log("------------------------------");
    console.log("");
    console.log("challenge:", challenge);
    console.log("");
    console.log("response:", response);
    console.log("");
    console.log("------------------------------");
    console.log("END fetch challenge");
    console.log("------------------------------");
    console.log("");
  }
  const { sesh, response: sessionIDResponse } = await fetchSeshID(db, email);
  if (!sesh) {
    console.log("");
    console.log("------------------------------");
    console.log("START fetch session id");
    console.log("------------------------------");
    console.log("");
    console.log("sessionIDResponse:", sessionIDResponse);
    console.log("");
    console.log("------------------------------");
    console.log("END fetch session id");
    console.log("------------------------------");
    console.log("");
  }

  console.log("");
  console.log("...");
  console.log("redirecting to /kaptchame");
  console.log("...");
  console.log("==============================");
  console.log("END loginformsubmit server action");
  console.log("==============================");
  console.log();

  // redirect("/kaptchame");
  return renderings;
}
