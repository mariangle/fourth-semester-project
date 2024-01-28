import { cn } from "@/lib/utils";

import Image from "next/image";
import Background from "@/public/static/background.png";
import LightBackground from "@/public/static/light-background.png";

export function BackgroundImage({
  blur,
  dark,
  className,
}: {
  blur?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Image
      alt="background image"
      className={cn("fixed z-0 cover min-h-[100svh] w-full", className)}
      src={Background}
      style={{
        filter: `brightness(${dark ? 0.5 : 0.7}) blur(${blur ? blur : 30}px)`,
        transform: "scale(1.1)",
      }}
    />
  );
}

export function LightBackgroundImage({
  blur,
  dark,
  className,
}: {
  blur?: number;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Image
      alt="background image"
      className={cn("fixed z-0 cover min-h-[100svh] w-full", className)}
      src={LightBackground}
    />
  );
}
