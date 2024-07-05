import { useState, useEffect } from "react";
import axios from "axios";
import {
  Tabs,
  Tab,
  Card,
  CardContent,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import ReserveCard from "./ReserveCard";
import style from "../../styles/BarberReserves.module.scss";
import EmptyList from "../../images/order-empty.svg";

const Notifications = ({ barberId }) => {
  const [showOprands, setShowOprands] = useState(false);
  const [reserves, setReserves] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const fetchReserves = async () => {
    const token = localStorage.getItem("token");
    try {
      const api = axios.create({
        baseURL: "https://reserveto-back.onrender.com/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await api.get(`api/notifications/`);
      setReserves(response.data.Appointments);
    } catch (error) {
      console.error("Error fetching reserves:", error);
    }
  };

  useEffect(() => {
    fetchReserves();
  }, [barberId]);

  return <div>dsvvsvsd</div>;
};

export default Notifications;
