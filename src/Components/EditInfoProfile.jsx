import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import checkIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LoginCOB from "../API/APIendpointLogin";
import style from "../styles/EditProfile.module.scss";
import APIUserUpdate from "../API/APIendpointUpdateUser";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment"
import { Avatar, Divider } from "@material-ui/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import SalonDashboard from "./salon/SalonDashboard";
import editProfile from "../components/barberDashboard/EditProfile";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import { useNavigate, useParams } from "react-router-dom";
import newPass from "../API/APIendpointNewPassword";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { Phone } from "@material-ui/icons";

// const user = {
//   firstname: 'پرهام',
//   lastname: 'هدایتی',
//   username: 'phd',
//   email: 'johndoe@example.com',
//   location:'تهران ، نیاوران',
//   followers: 100,
//   following: 50,
//   posts: 20
// };
const textfieldstyle = {
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
  '&label.Mui-error': {
      color: 'red !important', // Error label color
    },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'right', // Align helper text to the right
    direction: 'rtl',  // Set the text direction to right-to-left
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: 'var(--secondary-color)', // Default focused label color
    },
    '&.Mui-error': {
      color: 'red !important', // Error label color
    },
    '&.Mui-error.Mui-focused': {
      color: 'red !important', // Error label color when focused
    },
  },
  "& .MuiOutlinedInput-root": {
    '&.Mui-error fieldset': {
      borderColor: 'red !important',
    },
    '&.Mui-error:hover fieldset': {
      borderColor: 'red !important', // Error border color on hover
    },
    '&.Mui-error.Mui-focused fieldset': {
      borderColor: 'red !important',
    },
    '&.Mui-error.label.Mui-focused fieldset': {
      color: 'red !important',
    },

    "& fieldset": {
      borderColor: "var(--secondary-color) !important",
    },
    "&:hover fieldset": {
      borderColor: "var(--secondary-color-lighter) !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--secondary-color) !important",
    },
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "10px",
  },
  
  "& .MuiSelect-select": {
    paddingRight: "15px !important",
  },
};

const currencies = [
  {
    value: "ML",
    label: "مرد",
  },
  {
    value: "FML",
    label: "زن",
  },
];

const EditProfile = ({ user }) => {
  const [nameError, setNameError] = useState(false);
  const [usernameError , setUsernameError] = useState(false);
  const [lastnameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const validateName = (value) => /^[\u0600-\u06FF\s]+$/.test(value);
  const validatelastName = (value) => /^[\u0600-\u06FF\s]+$/.test(value);
  const validatePhone = (value) => /^(\+98|0)?9\d{9}$/.test(value);
  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validateUsername = (value) => /^[A-Za-z][A-Za-z0-9]+$/.test(value)

  const [profilePicture, setProfilePicture] = useState(null);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const [userData, setUserData] = useState({
    username: user.user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.user.email,
    address: user.address,
    // Add other fields as needed
  });
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };
  const handleApplyChanges = async () => {
    try {
      console.log("handleApplyChanges called -----------------------");
      // Call the function to update user profile
      await APIUserUpdate(user.id, userData);
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  const [username, setuserName] = useState(user.user.username);
  const handleUsername = (e) => {
    const value = e.target.value
    setuserName(value);
    setUsernameError(!validateUsername(value));
    
  };
  const [email, setemail] = useState(user.user.email);
  const handleEmail = (e) => {
    const value = e.target.value;
    setemail(value);
    setEmailError(!validateEmail(value));
  };

  const [isModified, setIsModified] = useState(false);
  useEffect(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    setIsModified(!isEqual(newData, user));
  }, []);
  const testData = {
    user: {
      username: username !== user.user.username ? username : undefined,
    },
  };
  const newMainData = {
    username: username,
    email: email,
  };
  const newData = {
    user: {
      username: username !== user.user.username ? username : undefined,
      email: email,
    },
    profile_Picture: profilePicture,
  };
  const edit = () => {
    try {
      console.log("handleApplyChanges called -----------------------");
      const formData = new FormData();
      formData.append("profilePicture", profilePicture); // Append the selected file
      formData.append("data", JSON.stringify(formData));
      APIUserUpdate(user.id, newData);
      //window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [salonprof, setsalonprof] = useState({});

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleUpload();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://reserveto-back.onrender.com/api/customers/profiles/${user.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setsalonprof((prevuser) => ({
        ...prevuser,
        profile_picture: response.data.profile_picture,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////
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
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    if (success && responseData) {
      setTimeout(() => {
        navigate("/Login");
      }, 4000);
    }
  }, [success, responseData, navigate]);
  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const person12 = {
      password: password,
      confirm_password: confirmPass,
    };
    console.log("Token:", tempToken);
    try {
      const response = await newPass(person12, tempToken);
      setResponseData(response.data);
      setSuccess(response.status === 200);
      if (response.status === 200) {
        toast.success("رمز با موفقیت تعویض گردید");
      }
    } catch (error) {
      console.error(error);
      toast.error("مشکلی پیش آمده");
    }
  };

  return (
    <div className={style.form}>
      <Paper
        sx={{
          width: "100%",
          padding: "50px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div className={style.formHeader}>
          <h3>اطلاعات شخصی</h3>
          <Button
            sx={{
              color: "var(--secondary-color)",
              borderColor: "var(--secondary-color)",
              "&:hover": {
                bgcolor: "var(--secondary-color-lighter)",
                borderColor: "var(--secondary-color)",
              },
            }}
            //type="submit"
            variant="outlined"
            onClick={edit}
            disabled={!isModified || usernameError || emailError }
          >
            ویرایش اطلاعات
          </Button>
        </div>
        <Divider flexItem />
          <TextField
            label="نام کاربری"
            name="first_name"
            value={username}
            onChange={handleUsername}
            fullWidth
            sx={textfieldstyle}
            error={usernameError}
            helperText={usernameError && "نام باید فقط شامل حروف فارسی باشد"}
          />
          <TextField
            label="ایمیل"
            name="email"
            value={email}
            onChange={handleEmail}
            fullWidth
            sx={textfieldstyle}
            error={emailError}
            helperText={emailError && "نام باید فقط شامل حروف فارسی باشد"}
          />
          <Divider flexItem />
        <div className={style.formItem}>
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
            onChange={handlePassChange}
            error={passwordError}
            // helperText={passwordError ? "Enter your password" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <TextField
            required
            label="تکرار رمز"
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
            className={style.confirmPassword}
            value={confirmPass}
            onChange={handleConfirmPassChange}
            error={confirmPasswordError}
            // helperText={confirmPasswordError ? "Confirm your password" : ""}
            inputProps={{
              pattern: "[a-zA-Z0-9._:$!%-]+",
            }}
          />
          <button className={style.newPassButton} onClick={handlePasswordReset}>
            تایید
          </button>
        </div>
        <span />
        <span />
        <Divider flexItem />
      </Paper>
    </div>
  );
};

export default EditProfile;
