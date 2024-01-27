import { Sidebar } from "@/components/sidebar";
import { OverlayProvider } from "@/components/providers/OverlayProvider";
import { BackgroundImage } from "@/components/ui/background-image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <BackgroundImage blur={30} dark className="hidden dark:block" />
      <div className="absolute z-10 flex min-h-screen w-full overflow-x-hidden dark:bg-black/50">
        <Sidebar />
        <div className="w-full overflow-x-auto bg-background dark:bg-black/70 rounded-lg shadow-xl p-8 m-2">
          {children}
        </div>
      </div>
      <OverlayProvider />
    </div>
  );
}
