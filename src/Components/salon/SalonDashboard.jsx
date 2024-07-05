import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import style from "../../styles/salon.module.scss";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
//import OrderList from "./OrderList";

const SalonDashboard = ({salon}) => {
  return (
    <div className={style.salondashboard}>
      <div className={style.profcontainer} style={{
         backgroundImage: `url(${salon.profile_picture})`,
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
       }}>
       <h1>سالن {salon.name}</h1>

      </div>
      <div className={style.dashboardmenu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <LocationOnIcon
              fontSize="large"
              sx={{
                color: "var(--primary-color)",
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
                color: "var(--primary-color)",
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
