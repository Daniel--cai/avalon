import { useEffect, useCallback, useState } from "react";
import * as Cookies from "js-cookie";
import { useCookie } from "./useCookie";

export const usePersistentStorage = () => {
  const [cookieName, setCookieName] = useCookie("name");
  const [cookieCode, setCookieCode] = useCookie("code");

  const setValue = useCallback((name: string, code: string) => {
    setCookieName(name);
    setCookieCode(code);
  }, []);

  return [{ name: cookieName, code: cookieCode }, setValue] as any;
};
