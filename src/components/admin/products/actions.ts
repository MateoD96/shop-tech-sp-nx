"use server";

import { productFormSchema } from "@/validations/product-schema";
import z from "zod";

export async function uploadProductImages(images: FileList) {}

export async function insertNewProduct(
  values: z.infer<typeof productFormSchema>
) {
  const productValues = productFormSchema.safeParse(values);

  if (productValues.error) {
    throw "Invalid data";
  }

  await uploadProductImages(productValues.data.productImages);

  console.log(productValues);
}
