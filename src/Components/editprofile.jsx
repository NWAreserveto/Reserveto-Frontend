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
import style from "../styles/EditProfile.module.scss";
import APIUserUpdate from "../API/APIendpointUpdateUser";
import axios from "axios";
import { Avatar, Divider } from "@material-ui/core";
//import style from "../styles/BarberDashboard.module.scss";
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
    setuserName(e.target.value);
  };
  const [firstname, setfirstname] = useState(user.first_name);
  const handleFirstname = (e) => {
    setfirstname(e.target.value);
  };
  const [lastname, setlastname] = useState(user.last_name);
  const handleLastname = (e) => {
    setlastname(e.target.value);
  };
  const [email, setemail] = useState(user.user.email);
  const handleEmail = (e) => {
    setemail(e.target.value);
  };
  const [address, setaddress] = useState(user.address);
  const handleAddress = (e) => {
    setaddress(e.target.value);
  };
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
    <div className={style.EditContainer}>
      <Box
        component="form"
        sx={{
          mb: 2,
          bgcolor: "var(--primary-color)",
          border: "2px solid",
          borderColor: "var(--secondary-color)",
          //bgcolor : 'white',
          height: { xs: 40, sm: 50, md: 60, lg: 600 },
          width: { xs: 400, sm: 450, md: 500, lg: 900 },
          "& .MuiTextField-root": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        //onSubmit={(e) => { e.preventDefault(); }}
      >
        <div style={{ margin: "25px" }}>
          <div className={style.changebutt}>
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <IconButton
                sx={{ color: "var(--secondary-color)" }}
                variant="contained"
                component="span"
                className={style.uploadbutton}
              >
                <AddPhotoIcon />
              </IconButton>
            </label>
          </div>
          <TextField
            id="outlined-basic"
            label="نام کاربری"
            variant="outlined"
            fullWidth
            required
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
            //className={style.username}
            value={username}
            onChange={handleUsername}
            //error={barberNameError}
            //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />
          <TextField
            id="outlined-basic"
            label="نام"
            variant="outlined"
            fullWidth
            required
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
            //className={style.username}
            value={firstname}
            onChange={handleFirstname}
            //error={barberNameError}
            //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />
          <TextField
            id="outlined-basic"
            label="نام خانوادگی"
            variant="outlined"
            fullWidth
            required
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
            //className={style.username}
            value={lastname}
            onChange={handleLastname}
            //error={barberNameError}
            //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />
          <TextField
            id="outlined-basic"
            label="ایمیل "
            variant="outlined"
            fullWidth
            required
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
            //className={style.username}
            value={email}
            onChange={handleEmail}
            //error={barberNameError}
            //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
            inputProps={{
              pattern: "[A-Za-z ]+",
            }}
          />
          <TextField
            id="outlined-basic"
            label="آدرس "
            variant="outlined"
            fullWidth
            required
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
            //className={style.username}
            value={address}
            onChange={handleAddress}
            //error={barberNameError}
            //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
            // inputProps={{
            //   pattern: "[A-Za-z ]+",
            // }}
          />
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "& .MuiOutlinedInput-notchedOutline": {
                  //borderColor: "#2e2e2e",
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--secondary-color)",
                    //borderWidth: "2px",
                  },
                },
                "&:hover:not(.Mui-focused)": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--secondary-color-lighter)",
                  },
                },
              },
              "& .MuiInputLabel-outlined": {
                fontWeight: "bold",
                "&.Mui-focused": {
                  color: "var(--secondary-color)",
                  fontWeight: "bold",
                },
              },
            }}
            id="outlined-select-currency"
            select
            label="جنسیت"
            defaultValue="ML"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={style.changebutt}>
          <Stack direction="row" spacing={2} gap={1}>
            <Button
              type="button"
              variant="contained"
              onClick={edit}
              sx={{ m: 1, bgcolor: "var(--secondary-color)" }}
              startIcon={<checkIcon />}
            >
              اعمال تغییرات
            </Button>
            <Button
              type="submit"
              variant="outlined"
              sx={{
                m: 1,
                borderColor: "var(--secondary-color)",
                color: "var(--secondary-color)",
              }}
              startIcon={
                <DeleteIcon sx={{ color: "var(--secondary-color)" }} />
              }
            >
              حذف تغییرات
            </Button>
          </Stack>
        </div>
      </Box>
    </div>
  );
};

export default EditProfile;
