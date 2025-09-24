import z from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Tu titulo debe tener más de 3 caracteres")
    .max(40, "Tu titulo no puede tener más de 40 caracteres"),
  description: z
    .string()
    .min(15, "Por favor describe mejor tu producto con almenos 20 caracteres")
    .max(200, "Tu descripcion es muy larga, máximo 200 caracteres"),
  status: z.enum(["borrador", "activo"]),
  categorie: z.string(),
});
