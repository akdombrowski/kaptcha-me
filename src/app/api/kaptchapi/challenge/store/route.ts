import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export default async function Challenges() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  );
  const { data, error } = await supabase
    .from("countries")
    .insert([
      { id: 1, name: "Nepal" },
      { id: 1, name: "Vietnam" },
    ])
    .select();
  return data;
}
