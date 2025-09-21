import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Home,
  CarFrontIcon,
  Settings,
  User2Icon,
  User2,
  ChevronUp,
  Tag,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SignOutBtn from "./login/signout-button";

const items = [
  { title: "Clientes", url: "#", icon: User2Icon },
  { title: "Configuracion", url: "#", icon: Settings },
];

const productsItems = {
  title: "Productos",
  icon: Tag,
  url: "/admin/products",
  items: [
    {
      title: "Colecciones",
      url: "/admin/products/collections",
    },
    {
      title: "Inventario",
      url: "#",
    },
    {
      title: "Ordenes de compra",
      url: "#",
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas" variant="inset" className="">
      <SidebarHeader className="text-center group-data-[collapsible=icon]:hidden">
        Other level Shop
      </SidebarHeader>

      <SidebarContent className="">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenu>
                <SidebarMenuButton asChild>
                  <Link href={"/admin"}>
                    <HomeIcon />
                    <span>Inicio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href={productsItems.url}>
                    <productsItems.icon />
                    <span>{productsItems.title}</span>
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {productsItems.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.url}>{subItem.title}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Mateo Admin
                  <ChevronUp className=" ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Link href={"#"}>Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"#"}>Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutBtn className="hover:no-underline p-0 cursor-pointer">
                    Sign out
                  </SignOutBtn>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
