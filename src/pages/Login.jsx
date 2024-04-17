import { Link } from "react-router-dom";
import { React, useState, Fragment } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Balance, Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import LoginCOB from "../API/APIendpointLogin";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Login = () => {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
    if (e.target.validity.valid) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
  };

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const person = {
    username: username,
    password: password,
  };

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const loginButt = (event) => {
    event.preventDefault();
    LoginCOB(person);
  };

  return (
    <div className="body">
      <div className="container" />

      <div className="login">
        <form className="login-form">
          <h1>ورود به حساب کاربری</h1>
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
            label="نام کاربری"
            variant="outlined"
            className="email"
            value={username}
            onChange={handleUsername}
            // error={usernameError}
          />
          <TextField
            label="رمز"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="icon"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
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
            className="password"
            value={password}
            onChange={handlePassword}
            // error={passwordError}
          />

          <input
            type="submit"
            className="loginButton"
            id="loginbutto"
            onClick={loginButt}
            value="ورود"
          />

          <div className="links">
            <Link to="/CreateAcc" className="createAcc">
              حساب کاربری نداری؟
            </Link>

            <Fragment>
              <Link className="forgetPass" onClick={handleClickOpen}>
                رمزتو یادت رفته؟
              </Link>

              <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    handleClose();
                  },
                }}
              >
                <div className="messageBox">
                  <DialogTitle>بازیابی رمز عبور</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      className="email_forgetpass"
                      label="ایمیل"
                      type="email"
                      fullWidth
                      variant="outlined"
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
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} sx={{ color: "#668F84" }}>
                      بستن
                    </Button>
                    <Fragment>
                      <Button
                        type="submit"
                        sx={{ color: "#668F84" }}
                        onClick={handleClickOpen2}
                      >
                        تایید
                      </Button>
                      <Dialog
                        open={open2}
                        onClose={handleClose2}
                        PaperProps={{
                          onSubmit: (event) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(
                              formData.entries()
                            );
                            const email = formJson.email;
                            handleClose2();
                          },
                        }}
                      >
                        <div className="messageBox">
                          <DialogTitle>موفقیت</DialogTitle>
                          <DialogContent>
                            ایمیل برات ارسال میشه :)
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={handleClose}
                              sx={{ color: "#668F84" }}
                            >
                              بستن
                            </Button>
                          </DialogActions>
                        </div>
                      </Dialog>
                    </Fragment>
                  </DialogActions>
                </div>
              </Dialog>
            </Fragment>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
