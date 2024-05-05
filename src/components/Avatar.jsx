import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import style from "../styles/Avatar.module.scss";
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Card from "./BarbersCard";
import LocationIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import ProfPic from "../images/profilePic.jpg";
import Background from "../images/LoginBackground.jpg"


// const user = {
//   name: 'پرهام هدایتی',
//   username: 'phd',
//   email: 'johndoe@example.com',
//   location:'تهران ، نیاوران',
//   followers: 100,
//   following: 50,
//   posts: 20
// };

const Avatar = ({ image, name, location ,onClick }) => {
  return (
    // <div className={style.container}>
    <box className = {style.back}
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
            <img className={style.avatar} src={image} ></img>
          </span>
        <span className={style.icon}>
          <h1>{name}</h1>
          <Stack direction="row" alignItems="center">
            <LocationIcon sx={{color: 'var(--secondary-color)'}}/>
            <Typography variant="body1"><h4>{location}</h4></Typography>
          </Stack>
          </span>
          <div className={style.butt}>
          <Button  variant="contained" onClick={onClick} endIcon={<EditIcon />} sx={{p : 2,bgcolor : 'var(--secondary-color)',
                                                                  '&:hover': {
                                                                    bgcolor: 'var(--secondary-color-lighter)',
                                                                  },}} >
            ویرایش پروفایل 
          </Button>
        </div>
    </box>
    // </div>
  );
};

export default Avatar;