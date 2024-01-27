import SettingsNav from "./settings-nav";
import { PageHeading } from "@/components/ui/page";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeading title="Settings" description="Manage your settings." />
      <SettingsNav />
      <div className="py-4">{children}</div>
    </>
  );
}
