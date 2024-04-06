`server-only`;
// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's

import "server-only";
// good practise to add `server-only` preemptively.

import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

type CheckChallengeReqBody = {
  challenge: string;
};

export const checkChallenge = async (formData: FormData) => { };

export async function GET(request: NextRequest) { }
export async function POST(request: NextRequest) { }