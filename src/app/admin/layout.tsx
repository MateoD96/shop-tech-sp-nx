import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getUserRole, getUserSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /*  const { data, error } = await getUserSession(); */
  /*   const res = data.user?.id && (await getUserRole(data.user?.id));
  const profileRoles = res && res?.data; */
  /* 
  if (error) {
    redirect("/error");
  } */

  /*   if (!profileRoles || profileRoles[0].role !== "admin") {
    return redirect("/login");
  } */

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className=" text-gray-800" size="lg" />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
