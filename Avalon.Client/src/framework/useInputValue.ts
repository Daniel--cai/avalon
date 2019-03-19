import { useState } from "react";

export const useInputValue = (initial: string) => {
  const [value, setValue] = useState(initial);
  return {
    value: value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value || e.target.innerText);
    }
  };
};
