import React from "react";

function Input({ label, name, type, placeholder, className, onChange, value }) {
  return (
    <div>
      <input
        aria-label={label}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Input;
