import { Avatar, Divider } from "@material-ui/core";
import style from "../styles/BarberDashboard.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Dashboard from "../components/barberDashboard/Dashboard";
import EditProfile from "../components/barberDashboard/EditProfile";
import { IconButton } from "@mui/material";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import { useEffect, useState } from "react";

const Barber = {
  Name: "کوشا لاهوتی",
  ProfilePic: "",
};

const BarberDashboard = () => {
  const barberIdList = window.location.href.split("/");
  const barberId = barberIdList[barberIdList.length - 1];

  const [barber, setBarber] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETBarberProfileAPI(barberId);
        setBarber(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [barberId]);
  return (
    <div className={style.container}>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <Avatar
            src={barber.profile_picture}
            sx={{
              width: "200px",
              height: "200px",
              bgcolor: "var(--primary-color)",
            }}
          ></Avatar>
          <div className={style.name}>
            <h3>{barber.first_name + " " + barber.last_name}</h3>
            <IconButton>
              <EditIcon />
            </IconButton>
          </div>

          <Divider
            flexItem
            variant="middle"
            sx={{
              borderBottomWidth: "1px",
              borderBottomColor: "var(--primary-color)",
            }}
          />
          <Button
            tabIndex={0}
            sx={{ fontSize: "20px" }}
          >
            <DashboardIcon fontSize="medium" />
            پیشخوان
          </Button>
          <Button sx={{ fontSize: "20px" }}>
            <EventIcon fontSize="medium" />
            رزورها
          </Button>
          <Button sx={{ fontSize: "20px" }}>
            <CommentIcon fontSize="medium" />
            نظرات
          </Button>
          <Button sx={{ fontSize: "20px" }}>
            <NotificationsIcon fontSize="medium" />
            اعلان ها
          </Button>
        </div>
        <div className={style.menuItem}>
          <Button sx={{ fontSize: "20px" }}>
            <LogoutIcon fontSize="medium" />
            خروج
          </Button>
          <h2>رزروتو</h2>
        </div>
      </div>
      <div className={style.main}>
        {/* <Dashboard /> */}
        <EditProfile barber={barber} />
      </div>
    </div>
  );
};

export default BarberDashboard;
