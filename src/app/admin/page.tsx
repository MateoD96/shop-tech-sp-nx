import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/get-session";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data, error } = await getUserSession();
  /*   const res = data.user?.id && (await getUserRole(data.user?.id));
  const profileRoles = res && res?.data; */

  if (!data || error) {
    redirect("/error");
  }

  /*  if (!profileRoles || profileRoles[0].role !== "admin") {
    return redirect("/login");
  }  */

  return <div className=" text-white">AdminPage</div>;
}
