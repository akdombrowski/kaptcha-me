"use server";
import "server-only";

import createChallenges from "@/actions/customFunction";
import type { GenerateChallengesRequestParams } from "@/actions/customFunction";

// GENERATE LIST OF CHALLENGES AND POSITIONS AND IMAGES
export const getNewChallenges = async ({
  numOptions,
  imgSize,
  imgSizeRacing,
  theme,
}: GenerateChallengesRequestParams) => {
  const challenges = await createChallenges({
    numOptions,
    imgSize,
    imgSizeRacing,
    theme,
  });

  console.log("");
  console.log("");
  console.log("");
  console.log("====================================");
  console.log("   server action getNewChallenges   ");
  console.log("====================================");
  console.log("");

  console.log("challenges");
  console.log(JSON.stringify(challenges, null, 2));
  console.log("");
  console.log("");
  console.log("====================================");
  console.log("   server action getNewChallenges   ");
  console.log("====================================");
  console.log("");
  console.log("");
  console.log("");

  return challenges;
};

export default getNewChallenges;
