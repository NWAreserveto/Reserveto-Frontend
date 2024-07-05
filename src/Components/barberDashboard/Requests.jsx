import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs, Tab, Typography, Paper, Divider } from "@mui/material";
import ReserveCard from "./ReserveCard";
import style from "../../styles/BarberReserves.module.scss";
import EmptyList from "../../images/order-empty.svg";
import RequestCard from "./RequestCard";

const Requests = ({ barberId, isAdmin }) => {
  const [requests, setRequests] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [showOprands, setShowOprands] = useState(false);
  const fetchRequests = async () => {
    const token = localStorage.getItem("token");
    try {
      const api = axios.create({
        baseURL: "https://reserveto-back.onrender.com/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const response = await api.get(`api/barbers/requests/`);
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching Requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [barberId]);

  useEffect(() => {
    tabIndex === 1 && isAdmin ? setShowOprands(true) : setShowOprands(false);
  }, [tabIndex]);

  const handleAccept = (id) => {
    const accept = async () => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("status", "approved");
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.patch(
          `api/barbers/admin/requests/confirmation/${id}/`,
          formData
        );
      } catch (error) {
        console.error("Error fetching Requests:", error);
      } finally {
        fetchRequests();
      }
    };
    accept();
  };

  const handleDecline = (id) => {
    const reject = async () => {
      try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("status", "rejected");
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await api.patch(
          `api/barbers/admin/requests/confirmation/${id}/`
        );
      } catch (error) {
        console.error("Error fetching Requests:", error);
      } finally {
        fetchRequests();
      }
    };
    reject();
  };

  const acceptedRequests = requests.filter(
    (request) => request.status === "approved"
  );
  const penddingRequests = requests.filter(
    (request) => request.status === "pending"
  );
  const notAcceptedRequests = requests.filter(
    (request) => request.status === "rejected"
  );
  const renderEmptyState = () => (
    <div className={style.emptyState}>
      <img
        src={EmptyList}
        alt="Empty list"
        className={style.emptyImage}
      />
      <Typography variant="h6">هیچ درخواستی یافت نشد</Typography>
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
        <h3 style={{ paddingBottom: "50px" }}>درخواست ها</h3>
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
                شماره درخواست
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                نام آرایشگر
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                آدرس آرایشگر
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                امتیاز آرایشگر
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                نام سالن
              </Typography>
              <Typography
                variant="subtitle2"
                className={style.headerItem}
              >
                آدرس سالن
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
            ? acceptedRequests.length === 0
              ? renderEmptyState()
              : acceptedRequests.map((request) => (
                  <ReserveCard
                    key={request.id}
                    request={request}
                    isAdmin={isAdmin}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))
            : tabIndex === 1
            ? penddingRequests.length === 0
              ? renderEmptyState()
              : penddingRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    isAdmin={isAdmin}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))
            : tabIndex === 2
            ? notAcceptedRequests.length === 0
              ? renderEmptyState()
              : notAcceptedRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    isAdmin={isAdmin}
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

export default Requests;
