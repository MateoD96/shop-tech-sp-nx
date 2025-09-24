import NewProductForm from "@/components/admin/products/product-form";
import MaxWidthWrapper from "@/components/layout/wrapper";
import { createClient } from "@/supabase/server";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("categories").select("*");

  return (
    <MaxWidthWrapper>
      <div>
        <h1>Agregar producto</h1>
      </div>

      <div>
        <NewProductForm categories={data!} />
      </div>
    </MaxWidthWrapper>
  );
}
