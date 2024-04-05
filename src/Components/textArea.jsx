import React from "react";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";

export default function CustomTextArea({
  label,
  password,
  showValue,
  handleShowValue,
  value,
  handleValueChange,
  error,
  errorText,
}) {
  return (
    <TextField
      label={label}
      variant="outlined"
      type={showValue ? "text" : "password"}
      InputProps={{
        endAdornment: password && (
          <InputAdornment position="end">
            <IconButton
              className="icon1"
              aria-label="toggle password visibility"
              onClick={handleShowValue}
            >
              {showValue ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        "& label": {
          transformOrigin: "right !important",
          left: "inherit !important",
          right: "1.75rem !important",
          fontSize: "small",
          color: "#807D7B",
          fontWeight: 400,
          overflow: "unset",
        },
        "& legend": {
          textAlign: "right",
          display: "flex",
          justifyContent: "center",
          fontSize: "10px",
        },
      }}
      className="password"
      value={value}
      onChange={handleValueChange}
      error={error}
      helperText={error ? errorText : ""}
      inputProps={{
        pattern: "[a-zA-Z0-9._:$!%-]+",
      }}
    />
  );
}