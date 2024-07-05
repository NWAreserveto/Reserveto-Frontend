import React from "react";
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import Rating from '@mui/material/Rating';
import style from "../../styles/salon.module.scss";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneIcon from '@mui/icons-material/Phone';
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//import OrderList from "./OrderList";

const SalonDashboard = ({salon}) => {
    const [value, setValue] = React.useState(4);
  return (
    <div className={style.salondashboard}>
      <div className={style.pagecontainer} style={{
         backgroundImage: `url(${salon.profile_picture})`,
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
       }}>
        <sapn >
        <h1>سالن {salon.name}</h1>
        </sapn>
        <div className={style.address}>
        <Stack direction="row" justifyContent="center" sx={{m:0}} alignItems="center">
        {/* <LocationOnIcon sx={{ color: "var(--secondary-color)" }} /> */}
        {/* <LocationOnIcon sx={{ color: "var(--secondary-color)" }} /> */}
        </Stack>
        </div>
        {/* </span> */}

      </div>
        
      <div className={style.dashboardmenu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <LocationOnIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>آدرس</h3>
          </div>
          <div className={style.score}>{salon.address}</div>
          <Divider flexItem />
          <Link>مشاهده نظرات</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <LocalPhoneIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>شماره تماس</h3>
          </div>
          <div className={style.score}>{salon.phone_number}</div>
          <Divider flexItem />
          <Link>منتظر تماس شما هستیم</Link>
        </Paper>
      </div>
      {/* <OrderList /> */}
    </div>
  );
};

export default SalonDashboard;
