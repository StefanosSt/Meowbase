import { useEffect } from "react";

export function useLockBodyScroll(isLocked: boolean = true) {
  useEffect(() => {
    if (isLocked) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isLocked]);
}