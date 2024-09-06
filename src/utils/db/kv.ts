import { kv, createClient } from "@vercel/kv";
import { NextResponse } from "next/server";

export const dbClient = async () => {
  return createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
};

export async function GET() {
  const user = await kv.hgetall("user:me");
  return NextResponse.json(user);
}
