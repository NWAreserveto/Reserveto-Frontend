// NewPassword.jsx
import { TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "../styles/NewPassword.module.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import newPass from "../API/APIendpointNewPassword";
import Button from "@mui/material/Button";

const NewPassword = () => {
  const { tempToken } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handlePassChange = (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const [confirmPass, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleConfirmPassChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.validity.valid) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  };

  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    if (success) {
      navigate("/");
    }
  };
  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const person12 = {
      password: password,
      confirm_password: confirmPass,
    };
    console.log("Token:", tempToken);
    try {
      const response = await newPass(person12, tempToken);
      setOpen(true);
      setSuccess(response.status === 200);
    } catch (error) {
      console.error(error);
      setOpen(true);
      setSuccess(false);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.container} />
      <div className={style.newPassword}>
        <form className={style.newPasswordForm}>
          <h2 className={style.text}>رمز جدید خود را وارد کنید</h2>
          <TextField
            required
            label="رمز"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="icon1"
                    aria-label="toggle password visibility"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
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
              "& label.Mui-focused": {
                color: "var(--secondary-color) !important",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "yellow",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--secondary-color) !important",
                },
                "&:hover fieldset": {
                  borderColor: "var(--secondary-color) !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary-color) !important",
                },
              },
            }}
            className={style.password}
            value={password}
            onChange={handlePassChange}
            error={passwordError}
            // helperText={passwordError ? "Enter your password" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
            required
            label="تکرار رمز"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="icon2"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
              "& label.Mui-focused": {
                color: "var(--secondary-color) !important",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "yellow",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "var(--secondary-color) !important",
                },
                "&:hover fieldset": {
                  borderColor: "var(--secondary-color) !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "var(--secondary-color) !important",
                },
              },
            }}
            className={style.confirmPassword}
            value={confirmPass}
            onChange={handleConfirmPassChange}
            error={confirmPasswordError}
            // helperText={confirmPasswordError ? "Confirm your password" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <button className={style.newPassButton} onClick={handlePasswordReset}>
            تایید
          </button>
        </form>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {success ? "موفقیت" : "ارور"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {success
              ? "رمز با موفقیت عوض شد."
              : "رمز عبور شما بازنشانی نشد. لطفا دوباره تلاش کنید"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>بستن</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewPassword;
