import { Card, CardContent, Typography, IconButton } from "@mui/material";
import style from "../../styles/BarberReserves.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const RequestCard = ({ request, isAdmin, onAccept, onDecline }) => {
  const [barber, setBarber] = useState([]);
  const [salon, setSalon] = useState([]);

  useEffect(() => {
    console.log(request);
    const fetchBarber = async () => {
      const token = localStorage.getItem("token");
      try {
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.get(
          `api/barbers/profiles/${request.barber}`
        );
        setBarber(response.data);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      }
    };
    const fetchSalon = async () => {
      const token = localStorage.getItem("token");
      try {
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.get(`api/salons/${request.salon}`);
        setSalon(response.data);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      }
    };

    fetchBarber();
    fetchSalon();
  }, [request]);
  return (
    <Card className={style.reserve}>
      <CardContent
        className={
          request.status === "pending" && isAdmin
            ? style.reserveContent
            : style.reserveContent2
        }
      >
        <Typography className={style.reserveItem}>{request.id}</Typography>
        <Typography className={style.reserveItem}>
          {barber.Full_Name}
        </Typography>
        <Typography className={style.reserveItem}>{barber.location}</Typography>
        <Typography className={style.reserveItem}>
          {barber.average_rating}
        </Typography>
        <Typography className={style.reserveItem}>{salon.name}</Typography>
        <Typography className={style.reserveItem}>{salon.address}</Typography>
        {request.status === "pending" && isAdmin && (
          <div className={style.reserveActions}>
            <IconButton onClick={() => onAccept(request.id)}>
              <CheckCircleIcon />
            </IconButton>
            <IconButton onClick={() => onDecline(request.id)}>
              <CancelIcon />
            </IconButton>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestCard;
