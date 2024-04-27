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
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token:", tempToken);
    if (tempToken) {
      axios
        .post("https://reserveto-back.onrender.com/api/password_reset/", {
          token: tempToken,
        })
        .then((response) => {
          if (response.status === 200) {
            setOpen(true);
          } else {
            // navigate("/error");
            alert("Error");
          }
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          alert("Error");
        });
    }
  }, [tempToken, navigate]);

  const handleClose = () => {
    setOpen(false);
  };

  const newPassbutton = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handlePasswordReset = () => {
    setOpen(true);
    // navigate("/Login");
  };

  return (
    <div className={style.body}>
      <div className={style.newPassword}>
        <form className={style.newPasswordForm}>
          <h3 className={style.text}>Enter your new password</h3>
          <TextField
            required
            label="Password"
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
            }}
            className={style.password}
            value={password}
            onChange={handlePassChange}
            error={passwordError}
            helperText={passwordError ? "Enter your password" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
            required
            label="Confirm Password"
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
            }}
            className={style.password}
            value={confirmPass}
            onChange={handleConfirmPassChange}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "Confirm your password" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <Fragment>
            <button className={style.newPassButton} onClick={newPassbutton}>
              Confirm
            </button>

            <div className={style.msgBox2}>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Password changed successfully.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button onClick={handlePasswordReset}>Close</button>
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
