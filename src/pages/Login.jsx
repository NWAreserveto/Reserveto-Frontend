import { Link } from "react-router-dom";
import { React, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import LoginCOB from "../API/APIendpointLogin";
import style from "../styles/Login.module.scss";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const loginButt = (event) => {
    event.preventDefault();
    LoginCOB(person);
    navigate("/BarbersLanding");
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
            <Link to="/CreateAcc" className={style.createAcc}>
              حساب کاربری نداری؟
            </Link>
            <Link className={style.forgetPass} to="/ForgetPassword">
              رمزتو یادت رفته؟
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
