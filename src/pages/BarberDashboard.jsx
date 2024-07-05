import { Avatar, Divider } from "@material-ui/core";
import style from "../styles/BarberDashboard.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { IconButton } from "@mui/material";
import axios from "axios";
import Dashboard from "../components/barberDashboard/Dashboard";
import EditProfile from "../components/barberDashboard/EditProfile";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import Reserves from "../components/barberDashboard/Reserves";
import Notifications from "../components/barberDashboard/Notifications";
import Requests from "../components/barberDashboard/Requests";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateSalon from "../components/barberDashboard/CreateSalon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const BarberDashboard = () => {
  const [index, setIndex] = useState(1);

  const barberIdList = window.location.href.split("/");
  const barberId = barberIdList[barberIdList.length - 1];
  const navigate = useNavigate();
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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleNavigate = () => {
    navigate(`/BarberProfile/${barberId}`);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://reserveto-back.onrender.com/api/barbers/profiles/${barberId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setBarber((prevBarber) => ({
        ...prevBarber,
        profile_picture: response.data.profile_picture,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const main = () => {
    switch (index) {
      case 0:
        return <EditProfile barber={barber} />;
      case 1:
        return <Dashboard barberId={barberId} />;
      case 2:
        return <Reserves barberId={barberId} />;
      // case3: Comments
      case 4:
        return <Notifications barberId={barberId} />;
      case 5:
        return (
          <Requests
            barberId={barberId}
            isAdmin={barber.is_admin}
          />
        );
      case 6:
        return (
          <CreateSalon
            barberId={barberId}
            barber={barber}
          />
        );
      default:
        return <Dashboard />;
    }
  };
  return (
    <div className={style.container}>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <div className={style.avatarContainer}>
            <Avatar
              src={barber.profile_picture}
              sx={{
                width: "200px",
                height: "200px",
                bgcolor: "var(--primary-color)",
              }}
            />

            <label htmlFor="file-upload2">
              <input
                id="file-upload2"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={style.fileInput}
              />
              <IconButton
                variant="contained"
                color="primary"
                component="span"
                className={style.uploadButton}
              >
                <EditIcon />
              </IconButton>
            </label>
          </div>
          <div className={style.name}>
            <h3>{barber.first_name + " " + barber.last_name}</h3>
            <IconButton
              className={style.button}
              onClick={() => setIndex(0)}
            >
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
            className={style.button}
            tabIndex={0}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(1)}
          >
            <DashboardIcon fontSize="medium" />
            پیشخوان
          </Button>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(2)}
          >
            <EventIcon fontSize="medium" />
            رزرو ها
          </Button>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(3)}
          >
            <CommentIcon fontSize="medium" />
            نظرات
          </Button>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(4)}
          >
            <NotificationsIcon fontSize="medium" />
            اعلان ها
          </Button>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(5)}
          >
            <AddIcon fontSize="medium" />
            درخواست ها
          </Button>
          {barber.is_admin && (
            <Button
              className={style.button}
              sx={{ fontSize: "20px" }}
              onClick={() => setIndex(6)}
            >
              <AddBusinessIcon fontSize="medium" />
              سالن من
            </Button>
          )}
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={handleNavigate}
          >
            <AccountCircleIcon fontSize="medium" />
            پروفایل
          </Button>
        </div>
        <div className={style.menuItem}>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={handleLogout}
          >
            <LogoutIcon fontSize="medium" />
            خروج
          </Button>
          <h2>رزروتو</h2>
        </div>
      </div>
      <div className={style.main}>{main()}</div>
    </div>
  );
};

export default BarberDashboard;
