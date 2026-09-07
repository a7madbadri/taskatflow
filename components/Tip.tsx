import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function Tip({ children, type }: { type: "error"; children: ReactNode }) {
  const types = {
    error: "text-red-500",
  };
  return <p className={twMerge("text-sm", types[type])}>{children}</p>;
}

export default Tip;
