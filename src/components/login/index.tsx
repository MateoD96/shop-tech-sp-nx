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
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { loginAction, signUpAction } from "./actions";
import { ToastContainer, toast } from "react-toastify";

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
  const [authError, setAuthError] = useState<string>("");

  const mutationLogin = useMutation({
    mutationKey: ["loginMutationKey"],
    mutationFn: (user: InferFormSchema) => loginAction(user),
    onError: (error: Error) => {
      if (error.message) {
        setAuthError(error.message);
      }
    },
  });

  const onSubmit = useCallback(
    (values: InferFormSchema) => {
      mutationLogin.mutate(values);
    },
    [mutationLogin]
  );

  return (
    <AuthForm
      errorAuth={authError}
      actionType="login"
      isPending={mutationLogin.isPending}
      onSubmit={onSubmit}
      setAction={setAction}
    />
  );
}

//////////////////////////////

function Register({ setAction }: { setAction: SetAction }) {
  const mutationRegister = useMutation({
    mutationKey: ["register"],
    mutationFn: (newUser: InferFormSchema) => signUpAction(newUser),
    onSuccess(data) {
      if (data)
        toast(data.message, {
          type: "success",
          position: "bottom-right",
          delay: 3000,
        });
    },
    onError(error) {
      console.log(error);
    },
  });

  const onSubmit = useCallback(
    (values: InferFormSchema) => {
      mutationRegister.mutate(values);
    },
    [mutationRegister]
  );

  return (
    <>
      <AuthForm
        actionType="register"
        isPending={mutationRegister.isPending}
        onSubmit={onSubmit}
        setAction={setAction}
      />
    </>
  );
}

///////////////////////////////////////////7

function AuthForm({
  errorAuth,
  isPending,
  setAction,
  actionType,
  onSubmit,
}: {
  errorAuth?: string;
  isPending: boolean;
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
            disabled={isPending}
            type="submit"
            variant={"outline"}
            className={cn("w-full text-black")}
          >
            {actionType === "login" ? "Ingresar" : "Registrarse"}
          </Button>
        </div>
      </form>
      <div>
        <p className=" font-light text-sm text-red-500">
          {errorAuth && errorAuth}
        </p>
      </div>
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
