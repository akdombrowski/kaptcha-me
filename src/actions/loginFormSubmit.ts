"use server";

import { cookies } from "next/headers";
import { Tables } from "./../utils/db/schemaTypes";
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
import { Database } from "@/utils/db/schemaTypes";

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

const encryptToHex = async (value) => {
  const { encrypted } = await encrypt(value, "utf8", "hex");

  return encrypted;
};

const hash = async (input) => {
  const hashed = sha512(input);
  return hashed;
};

// validate expected hash can be generated
const doesHashingEncryptedGiveExpectedHash = (valToBeHashed, hash) => {
  const isHashDerived = compareHash(valToBeHashed, hash);
  return isHashDerived;
};

// generate challenges, including renderings data
const getChallenges = async (props: {
  kookieJar: ReadonlyRequestCookies;
  db: SupabaseClient;
  numOptions: number;
  imgSize: number;
  theme?: string;
  email: string;
}) => {
  const { kookieJar, db, numOptions, imgSize, theme, email } = props;
  const paramsToCreateChallenges: GenerateChallengesRequestParams = {
    numOptions,
    imgSize,
    imgSizeRacing: imgSize,
    theme: theme ?? "racing",
  };

  // !WARNING
  // Includes the *SECRET CODE*, don't return that to the client just want renderings and themeSrc
  // but need to figure out how to store the code
  const challenges = await createChallenges(paramsToCreateChallenges);

  return challenges;
};

export const createSessionID = async (email: string, db: SupabaseClient) => {
  // create a unique session ID token
  const { seshID, createdAt } = createSeshID({ username: email });

  try {
    // store session ID token in backend
    const { data: dataSesh, error: errorSesh } = await updateSeshID(db, email, createdAt, seshID);

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

export const getChallengeFromDB = async (db: SupabaseClient, email: string) => {
  const { challenge, response } = await fetchChallenge(db, email);

  if (!challenge) {
    console.log("failed to retrieve challenge from backend");
    console.log("");
    console.log("backend response:");
    console.log(response);
    throw new Error("failed to retrieve challenge from backend", { cause: { response } });
  }

  if (!response) {
    console.log("Missing response (but got a challenge) from challenge fetch request");
    console.log("");
    console.log("challenge:");
    console.log(challenge);
  }

  return { challenge, response };
};

export const getSeshID = async (db, email) => {
  const { sesh, response } = await fetchSeshID(db, email);

  if (!sesh) {
    console.log("");
    console.log("response:");
    console.log(response);
    console.log("");
    throw new Error("Failed to retrieve session ID token", { cause: { response } });
  }

  return { sesh, response };
};
export const pushChallToDB = async (
  db: supabse.SupabaseClient<any, "public", any>,
  email: string,
  hashed: string,
): Promise<Database["public"]["Tables"]["challenge"]["Update"]> => {
  const { data, error } = await updateChallenge(
    db,
    email,
    new Date().toLocaleString("en-US"),
    hashed,
  );

  if (error) {
    console.log();
    console.log("db update challenge");
    console.log("data");
    console.log(data);
    console.log();
    console.log("error msg:", error.message);
    console.log();
    console.log("error deets");
    console.log(error.details);
    console.log();
    console.log("error hint:", error.hint, " ", "code:", error.code);
    throw new Error("error storing challenge in db", { cause: error });
  }

  return data;
};

export default async function loginFormSubmit(formData: FormData) {
  console.log("");
  console.log("==============================");
  console.log("START loginformsubmit server action");
  console.log("==============================");
  console.log("");

  const db = dbClient();
  const kookieJar = cookies();

  const { difficulty, email } = getFormData(formData);

  let { numOptions, imgSize } = parseGameDifficultySetting(difficulty, kookieJar);

  const challenges = await getChallenges({
    kookieJar: kookieJar,
    db,
    numOptions,
    imgSize,
    theme: "racing",
    email: email,
  });
  const renderings = challenges.renderings;

  const code = challenges.code;

  // store renderings in a server side cookie
  setSecureServerSideKookie(kookieJar, "renderings", JSON.stringify(renderings));

  // encrypt then hash the "correct" challenge code
  const encrypted = await encryptToHex(code);
  const hashedEncrypted = await hash(encrypted);

  // test if can reproducing the same hash from the encrypted code is repeatable
  const isHashExpected = doesHashingEncryptedGiveExpectedHash(encrypted, hashedEncrypted);
  if (!isHashExpected) {
    console.log("");
    console.log("hashing encrypted value gives different hash than expected");
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
    console.log(hashedEncrypted);
    console.log();
    console.log();
  }

  // store challenge in backend
  const storeChallRes = await pushChallToDB(db, email, hashedEncrypted);

  // create a unique session ID token
  const seshID = await createSessionID(email.toString(), db);

  // set server side cookies
  const setCookieResult = await setKookies({
    kookieJar,
    email: email.toString(),
    numOptions,
    imgSize,
    seshID,
  });

  // fetch challenge from backend
  const challenge = getChallengeFromDB(db, email.toString());

  // fetch session ID token via email from backend
  getSeshID(db, email.toString());

  console.log("");
  console.log("==============================");
  console.log("END loginformsubmit server action");
  console.log("==============================");
  console.log();

  // redirect("/kaptchame");
  // return the renderings object which includes positions, challenges, and images data
  return renderings;
}

function getFormData(formData: FormData) {
  const email = formData.get("email")!.toString();
  const password = formData.get("password")?.toString();
  const difficulty = formData.get("difficulty")?.valueOf();
  if (!email || !password || !difficulty) {
    console.error("missing one of email, password, difficulty from submitted form");
    formData.forEach((value, key) => console.log(`${key}: ${value} \n`));
  }
  return { difficulty, email, password };
}

function parseGameDifficultySetting(
  difficulty: string | Object | undefined,
  kookies: ReadonlyRequestCookies,
) {
  let numOptions = 10;
  let imgSize = 10;
  if (difficulty && typeof difficulty === "string") {
    // store difficulty in server side cookie
    setSecureServerSideKookie(kookies, "difficulty", `${difficulty}`);

    // convert frontend difficulty value to params needed for generating challenges
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
    return { numOptions, imgSize };
  } else {
    throw new Error("didn't receive a difficulty");
  }
}
