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
    .update({ user, created_at, challenge })
    .eq("user", user)
    .select();

  return { data, error };
};

export const updateSeshID = async (db, user, created_at, sesh_id) => {
  const { data, error } = await db
    .from("sesh")
    .update({ user, created_at, sesh_id })
    .eq("user", user)
    .select();


  console.log("");
  console.log("");
  console.log("==============================");
  console.log("IN UPDATE SESH ID");
  console.log("update db result: ", data);
  console.log("update db error: ", error);
  console.log("");
  const seshIDTable = await db.from("sesh").select("*");
  console.log("seshID table:", seshIDTable);
  console.log("");
  console.log("");

  console.log("***INSERT***");
  const { d, e } = await db
  .from('sesh')
  .insert([
    { user, created_at, sesh_id },
  ])
  .select()
  console.log("update db result: ", d);
  console.log("update db error: ", e);
  console.log("");

  console.log("==============================");
  console.log("");

  return { data, error };
};
