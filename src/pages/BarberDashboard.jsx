import { Avatar, Divider } from "@material-ui/core";
import style from "../styles/BarberDashboard.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Dashboard from "../components/barberDashboard/Dashboard";
const Barber = {
  Name: "کوشا لاهوتی",
  ProfilePic: "",
};

const BarberDashboard = () => {
  return (
    <div className={style.container}>
      <div className={style.menu}>
        <Avatar
          sx={{
            width: "200px",
            height: "200px",
            bgcolor: "var(--primary-color)",
          }}
        >
          {Barber.ProfilePic == "" ? Barber.Name.charAt(0) : Barber.ProfilePic}
        </Avatar>
        <h3>{Barber.Name}</h3>
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
          دشبورد
        </Button>
        <Button sx={{ fontSize: "20px" }}>
          <EventIcon fontSize="medium" />
          رزورها
        </Button>
        <Button sx={{ fontSize: "20px" }}>
          <CommentIcon fontSize="medium" />
          نظرات
        </Button>{" "}
        <Button sx={{ fontSize: "20px" }}>
          <NotificationsIcon fontSize="medium" />
          اعلان ها
        </Button>
        <Button sx={{ fontSize: "20px" }}>
          <SettingsIcon fontSize="medium" />
          تنظیمات
        </Button>
        <Button sx={{ fontSize: "20px" }}>
          <LogoutIcon fontSize="medium" />
          خروج
        </Button>
      </div>
      <div className={style.main}>
        <Dashboard />
      </div>
    </div>
  );
};

export default BarberDashboard;
