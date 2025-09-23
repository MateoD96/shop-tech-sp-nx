import { createClient } from "@/supabase/server";
import { cache } from "react";

export const getUserSession = cache(async () => {
  const supabase = await createClient();
  return await supabase.auth.getUser();
});

export const getUserRole = cache(async (userId: string) => {
  const supabase = await createClient();
  return await supabase.from("profiles").select("role").eq("id", userId);
});
