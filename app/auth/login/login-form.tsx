"use client";

import Image from "next/image";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

import Google from "@/public/google.svg";

export function LoginForm() {
  const onLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <form className="border border-black p-6 rounded-2xl w-full bg-black bg-opacity-50 backdrop-blur-2xl">
      <div className="flex items-center gap-6 mb-6">
        <div className="h-px w-full bg-secondary" />
        <div className="whitespace-nowrap text-sm text-white">
          Continue with
        </div>
        <div className="h-px w-full bg-secondary" />
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onLogin("google")}
        >
          <Image src={Google} alt="linkedin logo" className="w-6 h-6 mr-2" />
          Google
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          onClick={() => onLogin("slack")}
        >
          Slack
        </Button>
      </div>
    </form>
  );
}
