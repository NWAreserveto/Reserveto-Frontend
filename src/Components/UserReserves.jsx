// components/barberDashboard/Reserves.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab, Typography, Paper, Divider } from "@mui/material";
import ReserveCard from "./barberDashboard/ReserveCard";
import style from "../styles/BarberReserves.module.scss";
import EmptyList from "../images/order-empty.svg";

const Reserves = ({ barberId }) => {
  const [showOprands, setShowOprands] = useState(false);
  const [reserves, setReserves] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const fetchReserves = async () => {
    try {
      const response = await axios.get(
        `https://reserveto-back.onrender.com/api/B_orders/${barberId}`
      );
      setReserves(response.data.Appointments);
    } catch (error) {
      console.error("Error fetching reserves:", error);
    }
  };

  useEffect(() => {
    fetchReserves();
  }, [barberId]);

  const handleAccept = (id) => {
    const accept = async () => {
      try {
        const token = localStorage.getItem("token");
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.post(`api/appointment/${id}/confirm/`);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      } finally {
        fetchReserves();
      }
    };
    accept();
  };

  const handleDecline = (id) => {
    const reject = async () => {
      try {
        const token = localStorage.getItem("token");
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.post(`api/appointment/${id}/reject/`);
      } catch (error) {
        console.error("Error fetching reserves:", error);
      } finally {
        fetchReserves();
      }
    };
    reject();
  };

  const acceptedReserves = reserves.filter(
    (reserve) => reserve.barber_status === 1
  );
  const penddingReserves = reserves.filter(
    (reserve) => reserve.barber_status === 0
  );
  const notAcceptedReserves = reserves.filter(
    (reserve) => reserve.barber_status === -1
  );
  const renderEmptyState = () => (
    <div className={style.emptyState}>
      <img
        src={EmptyList}
        alt="Empty list"
        className={style.emptyImage}
      />
      <Typography variant="h6">هیچ رزروی یافت نشد</Typography>
    </div>
  );
  return (
    <Paper
      sx={{
        width: "90%",
        margin: "40px auto",
        padding: "50px 100px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <div className={style.container}>
        <h3 style={{ paddingBottom: "50px" }}>تاریخچه رزروها</h3>
        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="تایید شده" />
          <Tab label="در انتظار تایید" />
          <Tab label="رد شده" />
        </Tabs>
        <Divider flexItem />
        <div className={style.header}>
          <div className={style.headerCard}>
            <div
              className={
                showOprands ? style.headerContent : style.headerContent2
              }
            >
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                شماره رزرو
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                نام مشتری
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                ایمیل
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                تاریخ
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                زمان شروع
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                زمان پایان
              </Typography>
              {showOprands && (
                <Typography
                  variant="subtitle2"
                  className={style.headerItem}
                >
                  عملیات
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className={style.tabPanel}>
          {tabIndex === 0
            ? acceptedReserves.length === 0
              ? renderEmptyState()
              : acceptedReserves.map((reserve) => (
                  <ReserveCard
                    key={reserve.id}
                    reserve={reserve}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))
            : tabIndex === 1
            ? penddingReserves.length === 0
              ? renderEmptyState()
              : penddingReserves.map((reserve) => (
                  <ReserveCard
                    key={reserve.id}
                    reserve={reserve}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))
            : tabIndex === 2
            ? notAcceptedReserves.length === 0
              ? renderEmptyState()
              : notAcceptedReserves.map((reserve) => (
                  <ReserveCard
                    key={reserve.id}
                    reserve={reserve}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))
            : null}
        </div>
      </div>
    </Paper>
  );
};

export default Reserves;
