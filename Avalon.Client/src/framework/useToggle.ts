import { useState, useCallback } from "react";

export const useToggle = (initial: boolean) => {
  const [open, setOpen] = useState(initial);
  const callback = useCallback(() => setOpen(status => !status), [open]);
  return [open, callback];
};
