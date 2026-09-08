import { RefObject } from "react";

export const handleOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  e: MouseEvent,
  close: () => void,
) => {
  if (ref.current && !ref.current.contains(e.target as Node)) {
    close();
  }
};
