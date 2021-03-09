import React from "react";
import { Button as MuiButton } from "@material-ui/core";

function Button({ variant, size, color, text, ...props }) {
  return (
    <MuiButton
      variant={variant || "contained"}
      size={size || "large"}
      color={color}
      {...props}
    >
      {text}
    </MuiButton>
  );
}

export default Button;
