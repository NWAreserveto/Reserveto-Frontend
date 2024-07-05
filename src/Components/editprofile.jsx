import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import checkIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import style from "../styles/EditProfile.module.scss";
import APIUserUpdate from "../API/APIendpointUpdateUser";
import axios from "axios";
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
import { useEffect, useState } from "react";

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
  "& legend.Mui-error" : {
    mb : -2
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
  const [lastnameError, setLastNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const validateName = (value) => /^[\u0600-\u06FF\s]+$/.test(value);
  const validatelastName = (value) => /^[\u0600-\u06FF\s]+$/.test(value);
  const validatePhone = (value) => /^(\+98|0)?9\d{9}$/.test(value);

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
  // const handleChange = (event) => {
  //   setUserData({
  //     ...userData,
  //     [event.target.name]: event.target.value,
  //   });
  // };
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
    
  };
  const [firstname, setfirstname] = useState(user.first_name);
  const handleFirstname = (e) => {
    const value = e.target.value
    setfirstname(value);
    setNameError(!validateName(value));
  };
  const [lastname, setlastname] = useState(user.last_name);
  const handleLastname = (e) => {
    const value = e.target.value
    setlastname(value);
    setLastNameError(!validateName(value));
  };
  const [Phone , setphone] = useState(user.phone_number);
  const handlePhone = (e) => {
    const value = e.target.value;
    setphone(value);
    setPhoneError(!validatePhone(value));
  };
  const [email, setemail] = useState(user.user.email);
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const [address, setaddress] = useState(user.address);
  const handleAddress = (e) => {
    setaddress(e.target.value);
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
    Full_Name: firstname +" "+ lastname,
    first_name: firstname,
    last_name: lastname,
    address: address,
    phone_number : Phone,
    // user: {
    //   username: username !== user.user.username ? username : undefined,
    //   email: email,
    // },
    profile_Picture: profilePicture,
  };
  const edit = () => {
    try {
      console.log("handleApplyChanges called -----------------------");
      const formData = new FormData();
      formData.append("profilePicture", profilePicture); // Append the selected file
      formData.append("data", JSON.stringify(formData));
      APIUserUpdate(user.id, newData);
      window.location.reload();
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
  
  // const handleChange = (event) => {
  //     setName(event.target.value);}
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
            type="submit"
            variant="outlined"
            onClick={edit}
            disabled={!isModified || nameError || lastnameError || phoneError || addressError || (firstname == user.first_name &&
              lastname == user.last_name &&
              address == user.address && Phone == user.phone_number) || (address == null || lastname == null || firstname == null || Phone == null)}
          >
            ویرایش اطلاعات
          </Button>
        </div>
        <Divider flexItem />
        <div className={style.formItem}>
          <TextField
            label="نام"
            name="first_name"
            value={firstname}
            onChange={handleFirstname}
            fullWidth
            sx={textfieldstyle}
            error={nameError}
            helperText={nameError && "نام باید فقط شامل حروف فارسی باشد"}
          />
          </div>
          <div className={style.formItem}>
          <TextField
            label=" نام خانوادگی"
            name="last_name"
            value={lastname}
            onChange={handleLastname}
            fullWidth
            sx={textfieldstyle}
            error={lastnameError}
            helperText={lastnameError && "نام خانوادگی باید فقط شامل حروف فارسی باشد"}
          />
        </div>
        <div className={style.formItem}>
        <TextField
            label=" شماره همراه"
            name="phone_number"
            value={Phone}
            onChange={handlePhone}
            fullWidth
            sx={textfieldstyle}
            error={phoneError}
            helperText={phoneError && " فرمت شماره همراه نامعتبر است"}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="آدرس"
            name="address"
            value={address}
            onChange={handleAddress}
            fullWidth
            sx={textfieldstyle}
          />
        </div>
        <span />
        <span />
        <Divider flexItem />
      </Paper>
    </div>
  );
};

export default EditProfile;
