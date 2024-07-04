import { useEffect, useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Navbox from "../components/NavBox";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
//import style from "../styles/Avatar.module.scss"
import style from '../styles/UserDashboard.module.scss'
import Button from "@mui/material/Button"
import { IconButton } from "@mui/material";
import Usernavbar from "../components/Usernavbar";
import { Avatar, Divider } from "@material-ui/core";
import Editprofile from "../components/editprofile";
import Footer from "../components/Footer";
import Info from '../components/info'; // Assuming you have an Info component
import profilePic from "../images//profilePic.jpg"
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import APIendpointUser from "../API/APIendpointUser";
import ReservesComponent from "../components/ReservesComponent"; // Import your custom components
import CommentsComponent from "../components/CommentsComponent";
import InterestsComponent from "../components/InterestsComponent";
import CustomerReservesList from "../components/UserReserves";

const UserProfile = () => {
  const [index, setIndex] = useState(1);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const[user , setUser] = useState();
  const [userid,setuserid] = useState();
  
  const userList = window.location.href.split("/");
  const id = userList[userList.length - 1];
  useEffect(()=> {
    const fetchData = async () => {
      
      setuserid(id);
      setLoading(true);
      var temp = await APIendpointUser(id);
      setUser(temp);
      setLoading(false);
      console.log(temp);
    }
    fetchData();
  },[id]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleUpload();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("profile_picture", selectedFile);
  }
  

  const handleImageButtonClick = (index) => {
    console.log(index);
    setSelectedTab(index);
  };

  const toggleEditProfile = () => {
    setIsEditProfileActive(!isEditProfileActive); // Toggle edit profile mode
  };
  
  console.log(user);
  const main = () => {
    switch (index) {
      case 0:
      case 1:
      default:
    }
  };
  return (
    <>
    <Navbar />
    <div className={style.container}>
      <div className={style.menu}>
        <div className={style.menuItem}>
          <div className={style.avatarContainer}>
            <Avatar
              src={user.profile_picture}
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
            <h3>{user.Full_Name}</h3>
            {/* <h3>{user.user.username}</h3> */}
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
            <BookmarksIcon fontSize="medium" />
            علاقه‌مندی‌ها
          </Button>
          <Button
            className={style.button}
            sx={{ fontSize: "20px" }}
            onClick={() => setIndex(2)}
          >
            <EventIcon fontSize="medium" />
            رزورها
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
    </>
  );
};

export default UserProfile;
