import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Providers from "@/components/Providers";
import { ReactNode } from "react";

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${robotoSlab.variable} antialiased`}>
      <body className="min-h-full font-robotoSlab text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
