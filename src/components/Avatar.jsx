import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import style from "../styles/Avatar.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Card from "./BarbersCard";
import LocationIcon from "@mui/icons-material/LocationOn";
import ProfileAvatar from "@mui/material/Avatar";
import EmailIcon from "@mui/icons-material/Email";
import ProfPic from "../images/profilePic.jpg";
import Background from "../images/LoginBackground.jpg";

// const user = {
//   name: 'پرهام هدایتی',
//   username: 'phd',
//   email: 'johndoe@example.com',
//   location:'تهران ، نیاوران',
//   followers: 100,
//   following: 50,
//   posts: 20
// };
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
        <ProfileAvatar size='large' sx={{width : '200px' , height : '200px'}}  src={user.profile_picture}>{user.user.username.charAt(0)}</ProfileAvatar>
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
          variant="contained"
          onClick={onClick}
          endIcon={<EditIcon />}
          sx={{
            p: 2,
            bgcolor: "var(--secondary-color)",
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
    <h4>kit khar</h4>
  );
};

export default Avatar;
