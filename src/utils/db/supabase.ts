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
    .upsert({ user, created_at, challenge }, { ignoreDuplicates: false })
    .eq("user", user)
    .select();

  return { data, error };
};

export const updateSeshID = async (db, user, created_at, sesh_id) => {
  const { data, error } = await db
    .from("sesh")
    .update({ user, created_at, sesh_id }, { ignoreDuplicates: false })
    .eq("user", user)
    .select();

  return { data, error };
};

export const fetchChallenge = async (db, user) => {
  const { data, error } = await db.from("challenge").select().eq("user", user);
  return {
    challenge: data.length ? data[0].challenge : null,
    response: { data, error },
  };
};

export const fetchSeshID = async (db, user) => {
  const { data, error } = await db.from("sesh").select().eq("user", user);
  return {
    sesh: data.length
      ? { sessionID: data[0].sesh_id, createdAt: data[0].created_at }
      : null,
    response: { data, error },
  };
};
