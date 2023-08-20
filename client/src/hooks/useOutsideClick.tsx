import { useEffect, RefObject } from "react";

const useOutsideClick = (
  refs: RefObject<HTMLElement>[],
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (
      !refs.some((ref) => ref.current && ref.current.contains(e.target as Node))
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, callback]);
};

export default useOutsideClick;
