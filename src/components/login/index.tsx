"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { authFormSchema } from "@/validations/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { cn } from "@/lib/utils";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

type ActionAuth = "login" | "register";
type SetAction = (action: ActionAuth) => void;
type InferFormSchema = z.infer<typeof authFormSchema>;

export default function AuthActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [actionAuth, setActionAuth] = useState<ActionAuth>("login");

  const actionTitle =
    actionAuth === "login"
      ? "Ingresa a tu cuenta"
      : "Registrate y crea una cuenta";

  return (
    <div {...props} className={cn("flex flex-col", className)}>
      <Card className="h-auto p-4 bg-blue-950">
        <CardHeader>
          <CardTitle className="mt-2 text-center font-bold text-white uppercase">
            {actionTitle}
          </CardTitle>
        </CardHeader>
        {actionAuth === "login" ? (
          <Login setAction={setActionAuth} />
        ) : (
          <Register setAction={setActionAuth} />
        )}
      </Card>
    </div>
  );
}

/////////////////////////////////

function Login({ setAction }: { setAction: SetAction }) {
  const onSubmit = (values: InferFormSchema) => {
    console.log(values, "login");
  };

  return (
    <AuthForm actionType="login" onSubmit={onSubmit} setAction={setAction} />
  );
}

//////////////////////////////

function Register({ setAction }: { setAction: SetAction }) {
  const onSubmit = (values: InferFormSchema) => {
    console.log(values, "register");
  };

  return (
    <AuthForm actionType="register" onSubmit={onSubmit} setAction={setAction} />
  );
}

///////////////////////////////////////////7

function AuthForm({
  setAction,
  actionType,
  onSubmit,
}: {
  setAction: SetAction;
  actionType: ActionAuth;
  onSubmit: (values: InferFormSchema) => void;
}) {
  const form = useForm<InferFormSchema>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className=" flex flex-col gap-6">
          <div className="relative my-1 text-slate-200">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl className=" relative">
                    <Input
                      className="p-2"
                      placeholder="@my-email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className=" absolute top-16 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <div className="my-1 text-slate-200">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl className=" relative">
                    <Input
                      className="p-2"
                      type="password"
                      placeholder="*****"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage className="absolute top-16 text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-8">
          <Button
            type="submit"
            variant={"outline"}
            className="w-full text-black"
          >
            {actionType === "login" ? "Ingresar" : "Registrarse"}
          </Button>
        </div>
      </form>
      <div className="flex justify-evenly items-center mt-4 text-center text-sm">
        <p className=" text-slate-200">
          {actionType === "login"
            ? "¿ No tienes una cuenta ?"
            : " Ingresa a tu cuenta "}
        </p>
        <Button
          className=" hover:underline text-white font-bold "
          onClick={() =>
            setAction(actionType === "login" ? "register" : "login")
          }
          variant={"link"}
        >
          {actionType === "login" ? "Registrarse" : "Ingresar"}
        </Button>
      </div>
    </Form>
  );
}
