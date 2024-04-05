import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import propTypes from "prop-types";
// import { PropTypes } from "@mui/material/";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Imagew from "../images/barbim.jpg";
import CustomTextArea from "../components/textArea";
// import signUpNewCustomerAPI from "../API/ReservetoAPIendpoint";

// const customer1 = {
//     'user': {
//         'username': 'kiavash',
//         'email': 'kia@xyz.com',
//         'password': 'Mohammad13822003',
//         'confirm_password': 'Mohammad13822003'
//     },
//     'first_name': 'kia',
//     'last_name': 'la',
//     'phone_number': '+1234567890',
// };

const but = () => {
  alert("Finally.");
  // signUpNewCustomerAPI(customer1);
};

// for tabs
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: propTypes.node,
  index: propTypes.number.isRequired,
  value: propTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// end of tabs

const CreateAcc = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const [barberShowPassword, setBarberShowPassword] = useState(false);
  const handleBarberShowPassword = () => setBarberShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);

  const [showBarberConfirmPassword, setShowBarberConfirmPassword] =
    useState(false);
  const handleClickShowBarberConfirmPassword = () =>
    setShowBarberConfirmPassword(!showPassword);

  const [check, setCheck] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.validity.valid) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };
  const [barberName, setBarberName] = useState("");
  const [barberNameError, setBarberNameError] = useState(false);
  const handleBarberNameChange = (e) => {
    setBarberName(e.target.value);
    if (e.target.validity.valid) {
      setBarberNameError(false);
    } else {
      setBarberNameError(true);
    }
  };

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const [barberEmail, setBarberEmail] = useState("");
  const [barberEmailError, setBarberEmailError] = useState("");

  const handleBarberEmailChange = (e) => {
    setBarberEmail(e.target.value);
    if (e.target.validity.valid) {
      setBarberEmailError(false);
    } else {
      setBarberEmailError(true);
    }
  };

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

  const [barberPassword, setBarberPassword] = useState("");
  const [barberPasswordError, setBarberpasswordError] = useState("");

  const handleBarberPassChange = (e) => {
    setBarberPassword(e.target.value);
    if (e.target.validity.valid) {
      setBarberpasswordError(false);
    } else {
      setBarberpasswordError(true);
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

  const [barberConfirmPass, setBarberConfirmPassword] = useState("");
  const [barberConfirmPasswordError, setBarberConfirmPasswordError] =
    useState("");

  const handleBarberConfirmPassChange = (e) => {
    setBarberConfirmPassword(e.target.value);
    if (e.target.validity.valid) {
      setBarberConfirmPasswordError(false);
    } else {
      setBarberConfirmPasswordError(true);
    }
  };

  // functions for tabs
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [textInput, setTextInput] = useState("");

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  return (
    <div className="createAccount">
      <div className="imagew">
        <img src={Imagew} alt="wbarber" />
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="کاربر" {...a11yProps(0)} />
            <Tab label="آرایشگر" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <h1>پنل ثبت نام کاربر</h1>
          {/* <CustomTextArea  showPassword handleShowPassword passwordError password passwordErrorText  handlePassChange={}/> */}
          <TextField
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
            type="text"
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
            className="username"
            value={name}
            onChange={handleNameChange}
            error={nameError}
            helperText={nameError ? "نام کاربری خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />{" "}
          <br />
          <TextField
            id="outlined-basic"
            label="ایمیل"
            variant="outlined"
            type="text"
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
            className="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "ایمیل خود را وارد کنید" : ""}
            inputProps={{
              type: "email",
            }}
          />{" "}
          <br />
          <TextField
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
            className="password"
            value={password}
            onChange={handlePassChange}
            error={passwordError}
            helperText={passwordError ? "رمز خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
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
            }}
            className="password"
            value={confirmPass}
            onChange={handleConfirmPassChange}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "رمز خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <button onClick={but} className="SignUp">
            ثبت نام
          </button>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <h1>پنل ثبت نام آرایشگر</h1>
          <TextField
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
            type="text"
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
            className="username"
            value={barberName}
            onChange={handleBarberNameChange}
            error={barberNameError}
            helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />{" "}
          <br />
          <TextField
            id="outlined-basic"
            label="ایمیل"
            variant="outlined"
            type="text"
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
            className="email"
            value={barberEmail}
            onChange={handleBarberEmailChange}
            error={barberEmailError}
            helperText={barberEmailError ? "ایمیل خود را وارد کنید" : ""}
            inputProps={{
              type: "email",
            }}
          />{" "}
          <br />
          <TextField
            label="رمز"
            variant="outlined"
            type={barberShowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="icon1"
                    aria-label="toggle password visibility"
                    onClick={handleBarberShowPassword}
                  >
                    {barberShowPassword ? <Visibility /> : <VisibilityOff />}
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
            value={barberPassword}
            onChange={handleBarberPassChange}
            error={barberPasswordError}
            helperText={barberPasswordError ? "رمز خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
            label="تایید رمز"
            variant="outlined"
            type={showBarberConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    className="icon2"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowBarberConfirmPassword}
                  >
                    {showBarberConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
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
            value={barberConfirmPass}
            onChange={handleBarberConfirmPassChange}
            error={barberConfirmPasswordError}
            helperText={
              barberConfirmPasswordError ? "رمز خود را وارد کنید" : ""
            }
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
            label="نام "
            variant="outlined"
            type="text"
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
            className="name"
          />
          <CustomTextArea
            handleValue={handlePassChange}
            value={password}
            handleShowValue={handleShowPassword}
            label="رمز"
            error={passwordError}
            errorText={"eshtebah"}
            showValue={showPassword}
            password
          />
          <TextField
            label="نام خانوادگی"
            variant="outlined"
            type="text"
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
            className="lastName"
          />
          <TextField
            label="تلفن همراه"
            type="number"
            variant="outlined"
            className="telephoneNum"
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
          <button onClick={but} className="SignUp">
            ثبت نام
          </button>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default CreateAcc;