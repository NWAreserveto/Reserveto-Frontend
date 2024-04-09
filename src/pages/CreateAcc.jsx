import React, { useState, Fragment } from "react";
import { TextField } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
// import propTypes from "prop-types";
// import { PropTypes } from "@mui/material/";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Imagew from "../images/barbim.jpg";
import signUpNewCustomerAPI from "../API/APIendpointCustomer.jsx";
import signUpNewBarberAPI from "../API/APIendpointBarber.jsx";
import CustomTextArea from "../Components/textArea.jsx";
import { CustomTabPanel } from "../Components/tabPanel.jsx";
import { a11yProps } from "../Components/tabPanel.jsx";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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

  const [username, setName] = useState("");
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

  const [barberFirstName, setBarberFirstName] = useState("");
  const [barberFirstNameError, setBarberFirstNameError] = useState("");

  const handleBarberFirstName = (e) => {
    setBarberFirstName(e.target.value);
    if (e.target.validity.valid) {
      setBarberFirstNameError(false);
    } else {
      setBarberFirstNameError(true);
    }
  };

  const [barberLastName, setBarberLastName] = useState("");
  const [barberLastNameError, setBarberLastNameError] = useState("");

  const handleBarberLastName = (e) => {
    setBarberLastName(e.target.value);
    if (e.target.validity.valid) {
      setBarberLastNameError(false);
    } else {
      setBarberLastNameError(true);
    }
  };

  const [barberPhoneNum, setBarberPhoneNum] = useState("");
  const [barberPhoneNumError, setBarberPhoneNumError] = useState("");

  const handleBarberPhoneNum = (e) => {
    setBarberPhoneNum(e.target.value);
    if (e.target.validity.valid) {
      setBarberPhoneNumError(false);
    } else {
      setBarberPhoneNumError(true);
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

  const customer1 = {
    user: {
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPass,
    },
  };

  //   const customer1 = {
  //     'user': {
  //         'username': 'tarasetare',
  //         'email': 'ajsdasdj@gmail.com',
  //         'password': 'password23871',
  //         'confirm_password': 'password23871'
  //     },
  // };

  const barber1 = {
    user: {
      username: barberName,
      email: barberEmail,
      password: barberPassword,
      confirm_password: barberConfirmPass,
    },
    first_name: barberFirstName,
    last_name: barberLastName,
    phone_number: barberPhoneNum,
  };

  const barbersign = {
    user: {
      username: "tasdqqessdsftbarber",
      email: "barwdqberdwd@test.com",
      password: "Mohammad13822003",
      confirm_password: "Mohammad13822003",
    },
    first_name: "Johnhjj",
    last_name: "Dosakjdne",
    phone_number: "+1234571360",
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const customerSignupbutton = () => {
    signUpNewCustomerAPI(customer1);
    // alert("Haloo");
    setOpen(true);
  };

  const barberSignupbutton = () => {
    signUpNewBarberAPI(barber1);
    // alert('byee');
  };

  return (
    <body>
      <div className="container" />
      <div className="createAccount">
        <Box sx={{ width: "100%" }} className="koli">
          <Box className="tabs">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
              // className="tabs"
              sx={{
                backgroundColor: "var(--primary-color)",
                ".Mui-selected": {
                  color: "#668F8494",
                },
              }}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#668F84",
                },
              }}
            >
              <Tab label="کاربر" {...a11yProps(0)} />
              <Tab label="آرایشگر" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0} className="tab1">
            {/* <CustomTextArea  showPassword handleShowPassword passwordError password passwordErrorText  handlePassChange={}/> */}
            <div className="tab1"></div>
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
              value={username}
              onChange={handleNameChange}
              error={nameError}
              // helperText={nameError ? "نام کاربری خود را وارد کنید" : ""}
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
              // helperText={emailError ? "ایمیل خود را وارد کuنید" : ""}
              inputProps={{
                type: "email",
              }}
            />
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
              // error={passwordError}
              // helperText={passwordError ? "رمز خود را وارد کنید" : ""}
              // inputProps={{
              //   pattern: "[a-zA-Z0-9._:$!%-]+",
              // }}
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
              // error={confirmPasswordError}
              // helperText={confirmPasswordError ? "رمز خود را وارد کنید" : ""}
              // inputProps={{
              //   pattern: "[a-zA-Z0-9._:$!%-]+",
              // }}
            />
            <Fragment>
              <button onClick={customerSignupbutton} className="SignUpCustomer">
                ثبت نام
              </button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"response: 400"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    رکوئست باخت
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button onClick={handleClose}>بستن</button>
                </DialogActions>
              </Dialog>
            </Fragment>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1} className="tab2">
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
              value={barberFirstName}
              onChange={handleBarberFirstName}
              error={barberFirstNameError}
              helperText={barberFirstNameError ? "نام  خود را وارد کنید" : ""}
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
            />
            {/* <CustomTextArea
            handleValue={handlePassChange}
            value={password}
            handleShowValue={handleShowPassword}
            label="رمز"
            error={passwordError}
            errorText={"eshtebah"}
            showValue={showPassword}
            password
          /> */}
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
              value={barberLastName}
              onChange={handleBarberLastName}
              error={barberLastNameError}
              helperText={
                barberLastNameError ? "نام خانوادگی  خود را وارد کنید" : ""
              }
              inputProps={{
                pattern: "[A-Za-z ]+",
              }}
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
              value={barberPhoneNum}
              onChange={handleBarberPhoneNum}
              error={barberPhoneNumError}
              helperText={
                barberPhoneNumError ? "تلفن همراه خود را وارد کنید" : ""
              }
            />
            <button onClick={barberSignupbutton} className="SignUpBarber">
              ثبت نام
            </button>
          </CustomTabPanel>
        </Box>
      </div>
    </body>
  );
};

export default CreateAcc;
