import { Avatar, Divider } from "@material-ui/core";
import style from "../styles/BarberDashboard.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import axios from "axios";
import Dashboard from "../components/barberDashboard/Dashboard";
import EditProfile from "../components/barberDashboard/EditProfile";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import { useEffect, useState } from "react";

const BarberDashboard = () => {
  const [index, setIndex] = useState(1);

  const barberIdList = window.location.href.split("/");
  const barberId = barberIdList[barberIdList.length - 1];

  const [barber, setBarber] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

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
    setSelectedFile(event.target.files[0]);
    handleUpload();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);

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
        return <Dashboard />;
      // case2: Reserves
      // case3: Comments
      // case4: Notifications
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

            <label htmlFor="file-upload">
              <input
                id="file-upload"
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
        </div>
        <div className={style.menuItem}>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
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
