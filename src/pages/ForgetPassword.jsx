import { TextField } from "@mui/material";
import { useState, Fragment } from "react";
import ResetPassword from "../API/APIendpointForgetPassword";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const person2 = {
    email: email,
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const forgetPasswordButton = (event) => {
    event.preventDefault();
    ResetPassword(person2);
    setOpen(true);
  };

  return (
    <body>
      <div className="forgetPassword">
        <form className="forgetPass-form">
          <h1 className="text">بازیابی رمز عبور</h1>
          <TextField
            id="outlined-basic"
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
            label="ایمیل خود را وارد کنید"
            variant="outlined"
            className="email"
            value={email}
            onChange={handleEmail}
            error={emailError}
            helperText={emailError ? "ایمیل خود را وارد کuنید" : ""}
            inputProps={{
              type: "email",
            }}
          />
          <Fragment>
            <button className="forgetButton" onClick={forgetPasswordButton}>
              تایید
            </button>
            <div className="msgBox">
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"موفقیت"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ایمیل برات ارسال میشه :)
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
    </body>
  );
};

export default ForgetPassword;
