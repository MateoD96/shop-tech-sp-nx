"use server";

import { createClient } from "@/supabase/server";
import { authFormSchema } from "@/validations/auth-schema";
import z from "zod";

export async function signUpAction(data: z.infer<typeof authFormSchema>) {
  try {
    const supabase = await createClient();

    const user = authFormSchema.safeParse(data);

    if (!user.data) {
      throw { message: "Invalid data" };
    }

    const { error, data: newUser } = await supabase.auth.signUp(user.data);

    if (error) {
      throw { ...error };
    }

    return {
      state: "success",
      message: "Please verify your email",
      data: newUser,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
}
