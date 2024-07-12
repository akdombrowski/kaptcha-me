import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/utils/db/schemaTypes";

const url = process.env.NEXT_PUBLIC_DB_URL;
const key = process.env.NEXT_PUBLIC_DB_ANON_KEY;
export default function dbClient(): SupabaseClient {
  if (url && key) {
    return createClient<Database>(url, key);
  } else {
    throw new Error("not authorized");
  }
}
