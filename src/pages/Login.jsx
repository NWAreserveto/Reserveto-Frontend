import { Link, useNavigate } from "react-router-dom";
import { React, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import LoginCOB from "../API/APIendpointLogin";
import style from "../styles/Login.module.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    const role = localStorage.getItem("role");
    if (success) {
      if (role === "customer")
        navigate(`/BarbersLanding/${responseData.Customer.id}`);
      else navigate(`/Barber/Dashboard/${responseData.Barber.id}`);
    }
  };

  const person = {
    username: username,
    password: password,
  };

  const loginButt = async (event) => {
    event.preventDefault();
    try {
      const response = await LoginCOB(person);
      setResponseData(response.data);
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
      <div className={style.login}>
        <form className={style.loginForm}>
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
            label="نام کاربری"
            variant="outlined"
            className={style.email}
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
                    className={style.icon}
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
            onChange={handlePassword}
            // error={passwordError}
          />

          <input
            type="submit"
            className={style.loginButton}
            id="loginbutto"
            onClick={loginButt}
            value="ورود"
          />

          <div className={style.links}>
            <Link
              to="/CreateAcc"
              className={style.createAcc}
            >
              حساب کاربری نداری؟
            </Link>
            <Link
              className={style.forgetPass}
              to="/ForgetPassword"
            >
              رمزتو یادت رفته؟
            </Link>
          </div>
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
              ? "به حساب کاربری خود وارد شدید."
              : "اطلاعات وارد شده اشتباه است"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>بستن</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
