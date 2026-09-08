import { auth } from "@/auth";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="h-dvh w-dvw bg-slate-50 grid grid-cols-[48px_1fr] md:grid-cols-[auto_1fr] lg:grid-cols-[256px_1fr] p-4 overflow-hidden">
      <Sidebar />
      <main className="pl-4 overflow-scroll scrollbar-hide">{children}</main>
    </div>
  );
}
