import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from '@mui/icons-material/Star';
import style from "../../styles/Dashboard.module.scss";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import OrderList from "./OrderList";

const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.menu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <EventIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>رزروها</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده رزورها</Link>
        </Paper>
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
          <div className={style.score}>1111
          </div>
          <Divider flexItem />
          <Link>مشاهده نظرات</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <NotificationsIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>اعلان</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده اعلان ها</Link>
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
      <OrderList />
    </div>
  );
};

export default Dashboard;
