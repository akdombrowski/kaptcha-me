"use server";

import { cookies } from "next/headers";
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
import type { GenerateChallengesRequestParams } from "@/actions/customFunction";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { SupabaseClient } from "@supabase/supabase-js";

const setKookies = async (props: {
  kookieJar: ReadonlyRequestCookies;
  email: string;
  numOptions: number;
  imgSize: number;
  seshID: string;
}) => {
  const { email, numOptions, imgSize, seshID } = props;
  const { kookieJar } = props;
  const kookieVals = { email, numOptions, imgSize, seshID };

  // Set cookie
  for (const [k, v] of Object.entries(kookieVals)) {
    // Some of the values are numbers, so convert them to strings
    setSecureServerSideKookie(kookieJar, k, String(v));
  }
};

export const challenges = async (props: {
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
  console.log("unencrypted challenge code:");
  console.log(code);
  console.log();

  const { encrypted } = await encrypt(challenges.code, "utf8", "hex");
  console.log("encrypted challenge code:");
  console.log(encrypted);
  console.log();

  const hashed = sha512(encrypted);
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

export const createSessionID = async (email: string, db: SupabaseClient) => {
  const { seshID, createdAt } = createSeshID({ username: email });

  try {
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

    return seshID;
  } catch (error) {
    throw new Error("Session id error in login form submit", { cause: error });
  }
};

export const getChallenge = async (db: SupabaseClient, email: string) => {
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

  return { challenge, response };
};

export const getSeshID = async (db, email) => {
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

  return { sesh, sessionIDResponse };
};

export default async function loginFormSubmit(formData: FormData) {
  console.log("");
  console.log("==============================");
  console.log("START loginformsubmit server action");
  console.log("==============================");
  console.log("");

  const db = dbClient();
  const kookies = cookies();

  const { difficulty, email } = getFormData(formData);

  let { numOptions, imgSize } = gameSetup(difficulty, kookies);

  let renderings = await genChallenges(kookies, db, numOptions, imgSize, email);

  const seshID = await createSessionID(email.toString(), db);

  await setKookies({ email: email.toString(), numOptions, imgSize, seshID });

  getChallenge(db, email.toString());

  getSeshID(db, email.toString());

  console.log("");
  console.log("==============================");
  console.log("END loginformsubmit server action");
  console.log("==============================");
  console.log();

  // redirect("/kaptchame");
  return renderings;
}

async function genChallenges(
  kookies: ReadonlyRequestCookies,
  db: supabse.SupabaseClient<any, "public", any>,
  numOptions: number,
  imgSize: number,
  email: string,
) {
  let renderings;
  try {
    const challs = await challenges({
      kookies,
      db,
      numOptions,
      imgSize,
      theme: "racing",
      email: email,
    });

    renderings = challs.renderings;
  } catch (error) {
    console.log("");
    console.error("Failed to generate challenges", error);
  }

  return renderings;
}

function getFormData(formData: FormData) {
  const email = formData.get("email")!.toString();
  const password = formData.get("password")?.toString();
  const difficulty = formData.get("difficulty")?.valueOf();
  if (!email || !password || !difficulty) {
    formData.forEach((value, key) => console.log(`${key}: ${value} \n`));
  }
  return { difficulty, email, password };
}

function gameSetup(
  difficulty: string | Object | undefined,
  kookies: ReadonlyRequestCookies,
) {
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
  return { numOptions, imgSize };
}
