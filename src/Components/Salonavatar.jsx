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

// const salon = {
//   name : 'سالن زیبایی مریم',
//   email: 'johndoe@example.com',
//   address:'تهران ، نیاوران',
//   followers: 100,
//   following: 50,
//   posts: 20
// };

const Salonavatar = ({salon , onClick }) => {
  return ( 
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
      <span className={style.salonicon}>
        <h1>{salon.name}</h1>
        <Stack direction="row" alignItems="center">
          <LocationIcon sx={{ color: "var(--secondary-color)" }} />
          <Typography variant="body1">
            <h4>{salon.address}</h4>
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
            borderColor : "var(--secondary-color)",
            color : "white",
            color: "var(--primary-color)",
            "&:hover": {
              borderColor : "var(--secondary-color-lighter)"
              //bgcolor: "var(--secondary-color-lighter)",
            },
          }}
        >
          ویرایش مشخصات سالن
        </Button>
      </div>
    </box>
  )
};

export default Salonavatar;
