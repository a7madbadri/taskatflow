import { ReactNode } from "react";

function Subheading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl font-semibold w-fit relative before:absolute before:bottom-0 before:left-0 before:w-[30%] before:h-0.75 before:bg-indigo-600">
      {children}
    </h2>
  );
}

export default Subheading;
