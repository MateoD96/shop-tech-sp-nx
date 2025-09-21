import { createClient } from "@/supabase/server";
import { cache } from "react";

export default cache(async () => {
  const supabase = await createClient();
  return await supabase.auth.getUser();
});
