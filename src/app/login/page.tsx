import AuthForm from "@/components/login";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className=" bg-blue-950 p-4 rounded-md w-full max-w-sm">
        <AuthForm />
      </div>
    </div>
  );
}
