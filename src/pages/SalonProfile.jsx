//import { useEffect, useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Navbox from "../components/NavBox";
import SalonAvatar from "../components/salon/Salonavatar";
import SalonServices from "../components/salon/salonservices";
import SalonBarbers from "../components/salon/SalonBarbers";
import Background from "../images/LoginBackground.jpg";
import style from "../styles/salon.module.scss";
import Usernavbar from "../components/Usernavbar";
//import Avatar from '../components/Avatar'; // Assuming you have an Avatar component
import EditSalonprofile from "../components/salon/EditSalonProfile";
import Footer from "../components/Footer";
import Info from "../components/info"; // Assuming you have an Info component
import profilePic from "../images//profilePic.jpg";
//import axios from "axios";
import APIendpointUser from "../API/APIendpointUser";
import ReservesComponent from "../components/ReservesComponent"; // Import your custom components
import CommentsComponent from "../components/CommentsComponent";
import InterestsComponent from "../components/InterestsComponent";
import CustomerReservesList from "../components/UserReserves";
import BarbersLandingNavbar from "../components/BarbersLandingNavbar";
import APIgetSalon from "../API/APIendpointSalon";
import Face5Icon from "@mui/icons-material/Face5";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Avatar, Divider } from "@material-ui/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import axios from "axios";
import SalonDashboard from "../components/salon/SalonDashboard";
import EditProfile from "../components/barberDashboard/EditProfile";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SalonProfile = ({ barberid }) => {
  const [salon, setSalon] = useState([]);
  const [barberIDs, setBarberIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [salonprof, setsalonprof] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        const salonList = window.location.href.split("/");
        const salonid = salonList[salonList.length - 1];
        const data = await APIgetSalon(salonid);
        setSalon(data);
        console.log("data is : " + data);
        console.log("data.babers is : " + data.barbers);
        if (data && data.barbers) {
          setBarberIDs(String(data.barbers).split(","));
          console.log("ids : " + String(data.barbers).split(","));
          //setBarberIDs(ids);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBarberData();
  }, []);
  console.log("salon id is : " + salon.id);
  console.log("salon name is : " + salon.name);
  const barbers = [1, 12, 9, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10, 11];
  const [index, setIndex] = useState(1);
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
        `https://reserveto-back.onrender.com/api/salons/${salon.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setsalonprof((prevsalon) => ({
        ...prevsalon,
        profile_picture: response.data.profile_picture,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const main = () => {
    switch (index) {
      case 0:
        return <EditSalonprofile salon={salon} barberId={barberid} />;
      case 1:
        return <SalonDashboard />;
      case 5:
        return <SalonBarbers salonid={salon.id} barberIDs={barberIDs} />;
      // case2: Reserves
      // case3: Comments
      // case4: Notifications
      default:
        return <SalonDashboard />;
    }
  };
  return (
    <div
      className={style.container}
      style={{
        backgroundImage: `url(${salon.profile_picture})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className={style.menu}>
        <div className={style.menuItem}>
          <div className={style.avatarContainer}>
            <label htmlFor="file-upload">
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={style.fileInput}
              />
              <IconButton
                //sx={{m:"20px"}}
                variant="contained"
                color="primary"
                component="span"
                className={style.uploadButton}
              >
                <AddPhotoIcon />
              </IconButton>
            </label>
          </div>
          <Divider
            flexItem
            variant="middle"
            sx={{
              borderBottomWidth: "1px",
              borderBottomColor: "var(--primary-color)",
            }}
          />
          <div className={style.name}>
            <h3>{"سالن " + salon.name}</h3>
            <IconButton className={style.button} onClick={() => setIndex(0)}>
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
            onClick={() => setIndex(3)}
          >
            <CommentIcon fontSize="medium" />
            نظرات
          </Button>
          <Button
            className={style.button}
            tabIndex={0}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(5)}
          >
            <Face5Icon fontSize="medium" />
            آرایشگران
          </Button>
        </div>
        <div className={style.menuItem}>
          <Button onClick={()=>navigate(`/`)} className={style.button} sx={{ fontSize: "20px" }}>
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

export default SalonProfile;
