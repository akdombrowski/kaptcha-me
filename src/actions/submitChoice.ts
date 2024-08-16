"use server";

import dbClient, {
  fetchChallenge,
  fetchUserBySeshID,
} from "@/utils/db/supabase";
import { aesDecrypt } from "@/utils/encrypt";
import { cookies } from "next/headers";
import { createSecretKey } from "crypto";

// export default async function submitChoice(choice: FormEvent<HTMLButtonElement>) {
export default async function submitChoice(formData: FormData) {
  console.log("");
  console.log("");
  console.log("");
  console.log("inside submit choice server action");

  const choiceName = formData.keys().next().value;
  const choiceValue = formData.values().next().value;
  console.log("choiceName:", choiceName);
  console.log("choiceValue:", choiceValue);

  console.log("formAction");
  console.log();

  const kookies = cookies();
  const seshID = kookies.get("seshID");
  console.log("seshID:", seshID);
  console.log("seshID:", seshID?.value);
  console.log("");
  try {
    const challenge = await getChallengeBySeshID(seshID?.value);
    console.log("");
    console.log("challenge:", challenge);
    console.log("");

    const myKey = createSecretKey(process.env.PRIVATE_KEY!, "hex");
    const decryptChall = await aesDecrypt(
      choiceValue,
      myKey,
      Buffer.from(process.env.IV!, "hex"),
    );
    console.log("");
    console.log("challenge === decryptedChoiceValue");
    console.log("");
    console.log(challenge, "===", decryptChall);
    console.log("");
    console.log(challenge === decryptChall);
    console.log("");
    console.log("");
    if (challenge === choiceValue) {
      console.log("");
      console.log("CORRECT CHOICE");
      console.log("");
    } else {
      console.log("");
      console.log("***WRONG CHOICE");
      console.log("");
    }
  } catch (err) {
    console.error("error checking challenge", (err as Error).message);
  }
  console.log("");
  console.log("");
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
