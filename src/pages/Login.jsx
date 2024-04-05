import { Link } from "react-router-dom";
import { React, useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
// import Box from "@mui/material/Box";
import Image from "../images/rad.jpg";
// import CustomTextArea from "../components/textArea";

const login = () => {
  alert("you have succesfully logged in!");
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <body>
      <div className="image">
        <img src={Image} alt="barber" />
      </div>{" "}
      diso
      <div className="login">
        <form className="login-form">
          <h1 className="text">رزروتو، رزرو برای همه</h1>
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
          />

          <button onClick={login} className="loginButton">
            ورود
          </button>

          <div className="links">
            <div className="link1">
              <Link to="/CreateAcc">
                <a className="createAcc">حساب کاربری نداری؟</a>
              </Link>
            </div>
            <div className="link2">
              <a href="." className="forgetPass">
                رمزتو یادت رفته؟
              </a>
            </div>
          </div>
        </form>
      </div>
    </body>
  );
};

export default Login;