import { Sidebar } from "@/components/sidebar";
import { OverlayProvider } from "@/components/providers/OverlayProvider";
import {
  BackgroundImage,
  LightBackgroundImage,
} from "@/components/ui/background-image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LightBackgroundImage blur={30} dark className="" />
      <BackgroundImage blur={30} dark className="hidden dark:block" />
      <div className="absolute h-full z-10 flex flex-col lg:flex-row min-h-screen w-full overflow-x-hidden bg-gray-300/20 dark:bg-black/50">
        <Sidebar />
        <div className="w-full h-full lg:h-auto overflow-x-auto bg-white/70 dark:bg-black/70 rounded-2xl ld:rounded-lg shadow-xl p-6 lg:p-8 lg:m-4 lg:ml-0">
          {children}
        </div>
      </div>
      <OverlayProvider />
    </div>
  );
}
