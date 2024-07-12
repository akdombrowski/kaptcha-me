import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const client = () => {
  if (url && key) {
    return createClient(url, key);
  } else {
    return Error("not authorized");
  }
};

export default client;
