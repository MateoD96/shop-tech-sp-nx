"use server";

import { createClient } from "@/supabase/server";
import { authFormSchema } from "@/validations/auth-schema";
import { redirect } from "next/navigation";
import z from "zod";

export async function signUpAction(data: z.infer<typeof authFormSchema>) {
  const supabase = await createClient();

  const user = authFormSchema.safeParse(data);

  if (!user.data) {
    return undefined;
  }

  const { error, data: newUser } = await supabase.auth.signUp(user.data);

  if (error) {
    throw { ...error };
  }

  return { message: "Please verify your email", ...newUser };
}

export async function loginAction(values: z.infer<typeof authFormSchema>) {
  const supabase = await createClient();

  const { data: userData } = authFormSchema.safeParse(values);

  if (!userData) {
    throw new Error("Invalid form data");
  }

  const { error } = await supabase.auth.signInWithPassword(userData);

  if (error) {
    throw error;
  }

  redirect("/");
}
