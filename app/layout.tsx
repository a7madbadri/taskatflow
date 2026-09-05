import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import localFont from "next/font/local";

const robotoSlab = localFont({
  src: [
    {
      path: "../public/fonts/RobotoSlab.ttf",
      style: "normal",
    },
  ],
  variable: "--font-robotoSlab",
});

export const metadata: Metadata = {
  title: "TaskatFlow",
  description: "Manage your tasks",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${robotoSlab.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-robotoSlab text-slate-900">
        <div className="h-dvh w-dvw bg-slate-50 grid grid-cols-[48px_1fr] md:grid-cols-[auto_1fr] lg:grid-cols-[256px_1fr] p-4 overflow-hidden">
          <Sidebar />
          <main className="pl-4 overflow-scroll scrollbar-hide">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
