"use client";

import { createClient } from "@/supabase/browser";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default function SignOutBtn({
  className,
  children,
  ...props
}: { className?: string } & React.ComponentProps<"button">) {
  const supabase = createClient();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      redirect("/login");
    }
  };

  return (
    <Button
      {...props}
      className={cn(className)}
      onClick={signOut}
      variant="link"
    >
      {children}
    </Button>
  );
}
