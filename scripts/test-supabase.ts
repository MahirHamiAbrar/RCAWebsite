import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase.from("rca_users").select("*").limit(1);
  console.log(error);
}
run();
