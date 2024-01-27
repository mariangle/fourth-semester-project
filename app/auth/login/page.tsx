import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

import { LoginForm } from "./login-form";
import { BackgroundImage } from "@/components/ui/background-image";

export default async function Login() {
  const session = await auth();

  return (
    <div className="relative">
      <BackgroundImage />
      <div className="absolute w-full md:flex md:justify-between">
        <div className="flex flex-1 flex-col justify-center gap-8 bg-black bg-opacity-80 p-8 md:p-16 min-h-[100svh]">
          <div className="space-y-8 max-w-[400px] flex flex-col items-center justify-center w-full mx-auto text-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-2xl bg-gradient-to-r from-sky-700 to-blue-700 text-white h-12 w-12 flex items-center justify-center rounded-md text-center">
                IB
              </div>
            </Link>
            <h1 className="text-xl font-medium  text-white">
              Login to Intelligent Banker.
            </h1>
            <LoginForm />
          </div>
        </div>
        <div className="hidden md:block md:flex-1"></div>
      </div>
    </div>
  );
}
