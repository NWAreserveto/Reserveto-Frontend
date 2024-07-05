import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import style from "../../styles/Dashboard.module.scss";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import OrderList from "./OrderList";
import { useState, useEffect } from "react";
import axios from "axios";
import { toArray } from "lodash";

const Dashboard = ({ barberId }) => {
  const [status, setStatus] = useState({
    reserves: 5,
    comments: 6,
    notifications: 7,
    raiting: 5,
  });
  const fetchStatus = async () => {
    const token = localStorage.getItem("token");
    try {
      const api = axios.create({
        baseURL: "https://reserveto-back.onrender.com/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await api.get(`api/barbers/stats/${barberId}/`);
      setStatus(response.data);
    } catch (error) {
      console.error("Error fetching Requests:", error);
    }
  };
  useEffect(() => {
    fetchStatus();
  }, [barberId]);
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
          <div className={style.score}>{status.reserves}</div>
          <Divider flexItem />
          <Link>مشاهده رزروها</Link>
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
          <div className={style.score}>{status.comments}</div>
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
          <div className={style.score}>{status.notifications}</div>
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
          <div className={style.score}>{status.raiting}</div>
          <Divider flexItem />
          <Link>مشاهده امتیازات</Link>
        </Paper>
      </div>
      <OrderList />
    </div>
  );
};

export default Dashboard;
