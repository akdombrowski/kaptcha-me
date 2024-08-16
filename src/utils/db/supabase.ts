import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/db/schemaTypes";

const url = process.env.DB_URL;
const key = process.env.DB_ANON_KEY;
export default function dbClient(): SupabaseClient {
  if (url && key) {
    return createClient<Database>(url, key);
  } else {
    throw new Error("not authorized");
  }
}

export const updateChallenge = async (db, user, created_at, challenge) => {
  const { data, error } = await db
    .from("challenge")
    .upsert({ user, created_at, challenge }, {ignoreDuplicates: false})
    .eq("user", user)
    .select();


  return { data, error };
};

export const updateSeshID = async (db, user, created_at, sesh_id) => {
  const { data, error } = await db
    .from("sesh")
    .update({ user, created_at, sesh_id }, {ignoreDuplicates: false})
    .eq("user", user)
    .select();

  return { data, error };
};
