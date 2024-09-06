import { kv, createClient, type VercelKV } from "@vercel/kv";
import { NextResponse } from "next/server";

/**
 * @vercel/kv documentation:
 * https://vercel.com/docs/storage/vercel-kv/kv-reference
 */

export const dbClient = (): VercelKV => {
  return createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
};

export async function getAll() {
  const user = await kv.hgetall("user:me");
  return NextResponse.json(user);
}

export async function set() {
  try {
    const res = await kv.hset("userSession", { userId: 123, email: "ex@example.com" });
    return res;
  } catch (error) {
    // Handle errors
    throw new Error("Set hash object in storage failed", { cause: error });
  }
}
