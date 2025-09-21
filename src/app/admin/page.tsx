import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import getUserSession from "@/lib/get-session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const { data, error } = await getUserSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user?.id);

  if (error) {
    redirect("/error");
  }

  if (!profile || profile[0].role !== "admin") {
    return redirect("/login");
  }

  return <div className=" text-white">AdminPage</div>;
}
