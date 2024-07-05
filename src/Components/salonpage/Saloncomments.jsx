import React from "react";
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import Rating from '@mui/material/Rating';
import style from "../../styles/salon.module.scss";
import Comments from "../../components/comments/Comments";
import PhoneIcon from '@mui/icons-material/Phone';
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
//import OrderList from "./OrderList";

const SalonComments = ({salonname , salonphone}) => {
    const [value, setValue] = React.useState(4);
  return (
    <div className={style.saloncomments}>
        <h1>نظرات</h1>
      <Divider
        flexItem
        variant="middle"
        sx={{
          borderBottomWidth: "1px",
          borderBottomColor: "var(--primary-color)",
          mt: "10px",
          mb: "10px",
        }}
      />
      <div className={style.dashboardmenu}>
        <Comments/> 
      </div>
      {/* <OrderList /> */}
    </div>
  );
};

export default SalonComments;
