import dbClient from "@/utils/db/supabase";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export async function GET(req, res) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return res.status(401).end("Unauthorized");
  }
  // const supabase = dbClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  // );
  const supabase = dbClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY,
  );

  const { data: challenges, error } = await supabase
    .from("challenge")
    .select("*");

  if (error) {
    console.error("error fetching challenges from db");
    console.error(error);
    return new Response(JSON.stringify(error));
  }

  console.log("\nchallenges:");
  console.log(challenges);
  console.log("\n");

  // return <pre>{JSON.stringify(challenges, null, 2)}</pre>
  return new Response(JSON.stringify(challenges));
}
