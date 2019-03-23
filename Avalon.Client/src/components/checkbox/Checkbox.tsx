import React from "react";
import "./checkbox.css";

type Props = {
  checked: boolean;
  onChange: (e: any) => void;
  disabled: boolean;
  label: string;
};

export const Checkbox = (props: Props) => {
  const { checked, onChange, disabled, label } = props;
  return (
    <label className="checkbox-label">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        name={label}
      />
      <span className="checkmark" />
    </label>
  );
};
