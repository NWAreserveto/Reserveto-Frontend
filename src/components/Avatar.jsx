import React from "react";
import { useState,useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import style from "../styles/Avatar.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Card from "./BarbersCard";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import { IconButton } from "@mui/material";
import LocationIcon from "@mui/icons-material/LocationOn";
import ProfileAvatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import ProfPic from "../images/profilePic.jpg";
import Background from "../images/LoginBackground.jpg";
import axios from "axios";


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const Avatar = ({ user, onClick }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [salonprof, setsalonprof] = useState({});
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[1]);
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
      setsalonprof((prevBarber) => ({
        ...prevBarber,
        profile_picture: response.data.profile_picture,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };




  return user ? (
    // <div className={style.container}>
    <box
      className={style.back}
      // sx={{
      //   display : "grid",
      //   backgroundImage:"url('../images//LoginBackground.jpg')",
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   height: {xs: 40, sm: 50, md: 60, lg: 65},
      //   width: {xs: 400, sm: 450, md:500, lg: 600},
      //   }}
    >
      <span className={style.sp}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <ProfileAvatar size='large' sx={{width : '200px' , height : '200px'}}  src={user.profile_picture}>
          {user.user.username.charAt(0)}
          </ProfileAvatar>
            </StyledBadge>
      </span>
      <span className={style.icon}>
        <h1>{user.first_name + " " + user.last_name}</h1>
        <Stack direction="row" alignItems="center">
          <LocationIcon sx={{ color: "var(--secondary-color)" }} />
          <Typography variant="body1">
            <h4>{user.address}</h4>
          </Typography>
        </Stack>
      </span>
      <div className={style.butt}>
        <Button
          variant="outlined"
          onClick={onClick}
          endIcon={<EditIcon />}
          sx={{
            p: 2,
            color : "var(--secondary-color)",
            borderColor : "var(--secondary-color)",
            //bgcolor: "var(--secondary-color)",
            "&:hover": {
              bgcolor: "var(--secondary-color-lighter)",
            },
          }}
        >
          ویرایش پروفایل
        </Button>
      </div>
    </box>
  ) : (
    // </div>
    <h4>sharmandeh user nayomad bala</h4>
  );
};

export default Avatar;
