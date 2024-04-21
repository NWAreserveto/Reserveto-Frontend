import { TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import style from "../Styles/NewPassword.module.scss";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);

  const [password, setPassword] = useState("");
  const [passwordError, setpasswordError] = useState("");

  const handlePassChange = (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setpasswordError(false);
    } else {
      setpasswordError(true);
    }
  };

  const [confirmPass, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleConfirmPassChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.validity.valid) {
      setConfirmPasswordError(false);
    } else {
      setConfirmPasswordError(true);
    }
  };
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const newPassbutton = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  // const {token} = useParams();
  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // }}

  return (
    <div className={style.body}>
      <div className={style.newPassword}>
        <form className={style.newPasswordForm}>
          <h3 className={style.text}>رمز جدید خود را وارد نمایید</h3>
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
            }}
            className={style.password}
            value={password}
            onChange={handlePassChange}
            error={passwordError}
            helperText={passwordError ? "رمز خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
            required
            label="تایید رمز"
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
            className={style.password}
            value={confirmPass}
            onChange={handleConfirmPassChange}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "رمز خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <Fragment>
            <button className={style.newPassButton} onClick={newPassbutton}>
              تایید
            </button>

            <div className={style.msgBox2}>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"موفقیت"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    رمز با موفقیت عوض شد.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/">
                    <button onClick={handleClose}>بستن</button>
                  </Link>
                </DialogActions>
              </Dialog>
            </div>
          </Fragment>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
