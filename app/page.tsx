import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { format } from "date-fns";

import { BackgroundImage } from "@/components/ui/background-image";

import Facebook from "@/public/facebook.svg";
import LinkedIn from "@/public/linked-in.svg";

export default async function Home() {
  return (
    <div className="relative">
      <BackgroundImage />
      <div className="absolute min-h-[100svh] w-full p-8 md:p-16 flex justify-between">
        <div className="flex flex-col justify-between gap-8">
          <a
            href="https://intelligentbanker.com/"
            target="_blank"
            className="flex items-center gap-2 text-white"
          >
            <div className="bg-gradient-to-r from-sky-700 to-blue-700 text-white h-8 w-8 flex items-center justify-center rounded-md text-center">
              IB
            </div>
            Intelligent Banker
          </a>
          <div className="flex flex-col space-y-6 md:space-y-10 max-w-[900px]">
            <h1 className="text-5xl md:text-6xl xl:text-8xl font-medium text-white">
              Employee Time Tracking System
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Simplify and streamline your work hours with our internal time
              tracking app designed for employees.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href={"/auth/login"}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "w-fit text-lg rounded-2xl text-white bg-gradient-to-r from-sky-700 to-blue-700"
                )}
              >
                Lorem, ipsum dolor.
              </Link>
              <Link
                href={"/auth/login"}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "absolute top-8 right-8 sm:static w-fit text-lg rounded-2xl text-white hover:text-white bg-black/50 hover:bg-black/70"
                )}
              >
                Login
              </Link>
            </div>
          </div>
          <Footer />
        </div>
        <div className="hidden md:block">awdawd</div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="flex flex-col space-y-3 text-sm md:text-base mt-8">
      <div className="flex items-center gap-3">
        <a href="https://www.facebook.com/intelligentbanker/" target="_blank">
          <Image src={Facebook} alt="facebook logo" className="w-8 h-8" />
        </a>
        <a
          href="https://www.linkedin.com/company/intelligent-banker-aps/mycompany/"
          target="_blank"
        >
          <Image src={LinkedIn} alt="linkedin logo" className="w-8 h-8" />
        </a>
      </div>
      <div className="text-gray-300">
        © Intelligent Banker {format(new Date(), "yyyy")}
      </div>
      <div className="text-gray-300 flex gap-2">
        <div>Privacy Policy</div>
        <div>Terms of Service</div>
      </div>
    </footer>
  );
}
