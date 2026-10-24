import { twMerge } from "cn";
import { ComponentPropsWithRef, ReactNode } from "react";

type Props = ComponentPropsWithRef<"h2">;

function Subheading({ children, className }: Props) {
  return (
    <h2
      className={twMerge(
        "text-lg font-semibold w-fit relative before:absolute before:bottom-0 before:left-0 before:w-[30%] before:h-0.75 before:bg-indigo-600",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export default Subheading;
