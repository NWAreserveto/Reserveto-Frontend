import React from "react";
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import Rating from '@mui/material/Rating';
import style from "../../styles/salon.module.scss";
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
        <Divider
            flexItem
            variant="middle"
            sx={{
              borderBottomWidth: "1px",
              borderBottomColor: "var(--primary-color)",
            }}
        />
        <sapn>
        <h1>سالن {salon.name}</h1>
        <Stack direction="row" justifyContent="center" sx={{m:0}} alignItems="center">
        <LocationOnIcon sx={{ color: "var(--secondary-color)" }} />
        <Typography variant="body1">
            <h4>{salon.address}</h4>
        </Typography>
        <LocationOnIcon sx={{ color: "var(--secondary-color)" }} />
        </Stack>
        <Stack direction="row" justifyContent="center" sx={{m:0}} alignItems="center">
          <Typography variant="body1">
            <h4>{salon.phone_number}</h4>
          </Typography>
        </Stack>
        </sapn>
        <Divider
            flexItem
            variant="middle"
            sx={{
              borderBottomWidth: "1px",
              borderBottomColor: "var(--primary-color)",
            }}
        />
      <div className={style.dashboardmenu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <CommentIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>نظرات</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده نظرات</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <StarIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>امتیاز</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده امتیازات</Link>
        </Paper>
      </div>
      {/* <OrderList /> */}
    </div>
  );
};

export default SalonDashboard;
