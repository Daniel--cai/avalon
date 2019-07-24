import { useEffect, useCallback, useState } from "react";
import * as Cookies from "js-cookie";

export const useCookie = (key: string) => {
  const [item, setInnerValue] = useState(Cookies.get(key) || "");

  const setValue = useCallback((value: string) => {
    setInnerValue(value);
    Cookies.set(key, value);
  }, []);

  return [item, setValue] as any;
};
