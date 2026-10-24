import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-xl font-medium mb-3">TaskFlow</h1>
      {children}
    </div>
  );
}
