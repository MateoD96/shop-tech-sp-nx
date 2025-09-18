import { z, email } from "zod";

export const authFormSchema = z.object({
  email: email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
