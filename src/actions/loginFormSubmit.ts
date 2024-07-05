"use server";

import { redirect } from "next/navigation";
import createChallenges, {
  CreateChallengeParams,
} from "@/actions/createChallenges";

export default async function loginFormSubmit(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("");
  console.log("");
  console.log("");
  console.log("==============================");
  console.log("loginformsubmit server action");
  console.log("==============================");
  console.log("");
  console.log("requesting new challenges...");
  console.log("");

  const createChallengeParams: CreateChallengeParams = {
    numOptions: 13,
    imgSize: 10,
    imgSizeRacing: 10,
    theme: "racing",
  };
  const challenges = await createChallenges(createChallengeParams);
  console.log("challenges:");
  console.log(challenges);

  console.log("");
  console.log("email:", email);
  console.log("password:", password);
  console.log(JSON.stringify(formData, null, 2));
  console.log("redirecting to /kaptchame");
  console.log("");
  console.log("==============================");
  console.log("loginformsubmit server action");
  console.log("==============================");
  console.log("");
  console.log("");
  console.log("");

  redirect("/kaptchame");
}
