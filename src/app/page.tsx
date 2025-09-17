import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const { data } = await supabase.from("products").select("*");

  console.log(data);

  return (
    <h1 className=" text-center text-fuchsia-600 font-bold text-3xls">
      Welcome to the Home Page
    </h1>
  );
}
