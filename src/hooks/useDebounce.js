import { useEffect } from "react";
import useTimeOut from "./useTimeOut";

const useDebounce = (callback, delay, dependencies) => {
  const { reset, clear } = useTimeOut(callback, delay);

  useEffect(() => {
    reset();

    return clear;
  }, [...dependencies, reset, clear]);

  return reset;
};

export default useDebounce;