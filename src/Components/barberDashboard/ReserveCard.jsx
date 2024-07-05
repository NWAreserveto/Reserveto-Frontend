// components/barberDashboard/ReserveCard.js
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import style from "../../styles/BarberReserves.module.scss";
import { format } from "date-fns-jalali";
import { useState, useEffect } from "react";
import axios from "axios";

const ReserveCard = ({ reserve, onAccept, onDecline }) => {
  const [user, setUser] = useState({ user: { email: "" } });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "yyyy/MM/dd");
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      try {
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.get(
          `api/customers/profiles/${reserve.customer}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      }
    };

    fetchUser();
  }, [reserve]);

  return (
    <Card className={style.reserve}>
      <CardContent className={style.reserveContent2}>
        <Typography className={style.reserveItem}>{reserve.id}</Typography>
        <Typography className={style.reserveItem}>{user.Full_Name}</Typography>
        <Typography className={style.reserveItem}>{user.user.email}</Typography>
        <Typography
          className={style.reserveItem}
          color="textSecondary"
        >
          {formatDate(reserve.day)}
        </Typography>
        <Typography
          className={style.reserveItem}
          color="textSecondary"
        >
          {formatTime(reserve.start_time)}
        </Typography>
        <Typography
          className={style.reserveItem}
          color="textSecondary"
        >
          {formatTime(reserve.end_time)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReserveCard;
