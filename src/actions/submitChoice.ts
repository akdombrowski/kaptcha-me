"use server";

import dbClient, {
  fetchChallenge,
  fetchUserBySeshID,
} from "@/utils/db/supabase";
import { encrypt, aesDecrypt, sha512 } from "@/utils/encrypt";
import { cookies } from "next/headers";
import { createSecretKey } from "crypto";

// export default async function submitChoice(choice: FormEvent<HTMLButtonElement>) {
export default async function submitChoice(formData: FormData) {
  console.log("==============================");
  console.log("inside submit choice server action");
  console.log("==============================");
  console.log("");

  const choiceName = formData.keys().next().value;
  const choiceValue = formData.values().next().value;
  // console.log("choiceName:", choiceName);
  // console.log("");
  console.log("chosen challenge:", choiceValue);
  console.log("");

  const kookies = cookies();
  const seshID = kookies.get("seshID");
  console.log("seshID:", seshID?.value);
  console.log("");
  try {
    const challenge = await getChallengeBySeshID(seshID?.value);
    console.log("fetch correct challenge:", challenge);
    console.log("");

    const PRIVATE_KEY = process.env.PRIVATE_KEY!;
    const IV = process.env.IV!;
    const myKey = createSecretKey(PRIVATE_KEY, "hex");

    try {


      const { encrypted, aesKey, iv } = await encrypt(
        choiceValue,
        "utf8",
        "hex",
      );

      const hashed = sha512(encrypted);
      // const decryptChall = await aesDecrypt(
      //   choiceValue,
      //   myKey,
      //   Buffer.from(IV, "hex"),
      // );
      console.log("");
      console.log("correct challenge === chosen challenge encrypted hashed");
      console.log("");
      console.log(challenge, "\n\n===\n\n", hashed);
      console.log("");
      console.log(challenge === hashed);
      console.log("");
      console.log("");
      if (challenge === hashed) {
        console.log("");
        console.log("CORRECT CHOICE");
        console.log("");
      } else {
        console.log("");
        console.log("***WRONG CHOICE");
        console.log("");
      }
    } catch (error) {
      throw new Error("decryption error", { cause: error });
    }
  } catch (err) {
    console.error("error checking challenge", err as Error);
  }

  console.log("");
  return "returning from submitChoice server action, yes";
}

export const getChallengeBySeshID = async (seshID) => {
  const db = dbClient();
  const { sesh, response } = await fetchUserBySeshID(db, seshID);
  if (sesh) {
    const { user, createdAt } = sesh;

    if (!user) {
      throw new Error("Session found but no user.", {
        cause: { sesh, response },
      });
    }

    const { challenge, response: challResponse } = await fetchChallenge(
      db,
      user,
    );

    if (!challenge) {
      throw new Error("Challenge not found via user lookup.", {
        cause: challResponse,
      });
    }

    return challenge;
  } else {
    throw new Error("Session not found via session ID lookup", {
      cause: response,
    });
  }
};
