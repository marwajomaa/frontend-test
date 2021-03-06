import React from "react";
import { TextField } from "@material-ui/core";

function Input({
  label,
  name,
  type,
  placeholder,
  className,
  onChange,
  value,
  ...other
}) {
  return (
    <div>
      <TextField
        aria-label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
        variant="outlined"
        label={label}
        style={{ width: "100%" }}
        {...other}
      />
    </div>
  );
}

export default Input;
