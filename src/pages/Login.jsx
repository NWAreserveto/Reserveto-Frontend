import { Link } from "react-router-dom";
import { React, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
// import Box from "@mui/material/Box";
import Image from "../images/LoginBackground.jpg";
// import CustomTextArea from "../components/textArea";
import LoginCOB from "../API/APIendpointLogin";

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

  const loginButton = () => {
    LoginCOB(person);
  };

  return (
    <body>
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
            error={usernameError}
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
            error={passwordError}
          />

          <button onClick={loginButton} className="loginButton">
            ورود
          </button>

          <div className="links">
            <Link to="/CreateAcc">
              <a className="createAcc">حساب کاربری نداری؟</a>
            </Link>
            <a href="." className="forgetPass">
              رمزتو یادت رفته؟
            </a>
          </div>
        </form>
      </div>
    </body>
  );
};

export default Login;
