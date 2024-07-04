//import { useEffect, useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Navbox from "../components/NavBox";
import SalonAvatar from "../components/salon/Salonavatar";
import SalonServices from "../components/salon/salonservices";
import SalonBarbers from "../components/salonpage/SalonPageBarbers";
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
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Stack from "@mui/material/Stack";
import APIgetSalon from "../API/APIendpointSalon";
import Face5Icon from "@mui/icons-material/Face5";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Avatar, Divider } from "@material-ui/core";
//import style from "../styles/BarberDashboard.module.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import axios from "axios";
import SalonDashboard from "../components/salonpage/SalonPageDashboard";
import SalonComments from "../components/salonpage/Saloncomments";
import EditProfile from "../components/barberDashboard/EditProfile";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
// const SalonProfile = () => {
//   const [salon,setSalon] = useState([]);
//   const [barberIDs, setBarberIDs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedTab, setSelectedTab] = useState(null);
//   const [isEditProfileActive, setIsEditProfileActive] = useState(false);
//   const [isHovered, setIsHoverd] = useState(false);
//   const [isMenuHovered, setIsMenuHovered] = useState(false);

//   useEffect(() => {
//     const fetchBarberData = async () => {
//       try {
//         const salonList = window.location.href.split("/");
//         const salonid = salonList[salonList.length - 1];
//         const data = await APIgetSalon(salonid);
//         setSalon(data);
//         console.log("data is : " + data);
//         console.log("data.babers is : " + data.barbers);
//         if (data && data.barbers) {
//           setBarberIDs(String(data.barbers).split(','));
//           console.log("ids : " + String(data.barbers).split(','));
//           //setBarberIDs(ids);
//         }
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBarberData();
//   }, []);
//   const handleImageButtonClick = (index) => {
//     console.log(index);
//     setSelectedTab(index);
//   };
//   const toggleEditProfile = () => {
//     setIsEditProfileActive(!isEditProfileActive); // Toggle edit profile mode
//   };
//   console.log("salon id is : " + salon.id);
//   console.log("salon name is : " + salon.name);

//   return (
//     <div className={style.userpage}>
//         <SalonAvatar salon={salon} onClick={toggleEditProfile}/>
//         {isEditProfileActive ? (
//         <div className={style.editcontainer}>
//         <EditSalonprofile salon={salon} />
//         </div>
//         ) : (
//         <div className={style.barbers}>
//           <SalonBarbers salonid={salon.id} barberIDs={barberIDs}/>
//       </div>
//       )
//       }
//         {/* <SalonServices/> */}
//     </div>
// )
// };

// export default SalonProfile;


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
  //const [index, setIndex] = useState(1);
  const navig = ()=>{
    navigate(-1)
  }

  const main = () => {
    // switch (index) {
    //   case 0:
    //     return <EditSalonprofile salon={salon} barberId={barberid} />;
    //   case 1:
    //     return <SalonDashboard salon={salon}/>;
    //   case 2:
    //     return <SalonComments />
    //   case 3:
    //     return <SalonBarbers salonid={salon.id} barberIDs={barberIDs} />;
    //   default:
    //     return <SalonDashboard salon={salon}/>;
    // }
  };
  return (
    <>
    <Navbar />
    <div
      className={style.container}
      // style={{
      //   backgroundImage: `url(${salon.profile_picture})`,
      //   backgroundSize: "cover",
      //   backgroundRepeat: "no-repeat",
      //   backgroundPosition: "center",
      // }}
    >
      <div className={style.salondashboard}>
      <div className={style.pagecontainer} style={{
         backgroundImage: `url(${salon.profile_picture})`,
         backgroundSize: "cover",
         backgroundRepeat: "no-repeat",
         backgroundPosition: "center",
       }}>
        <sapn >
        <h1>سالن {salon.name}</h1>
        </sapn>
        <div className={style.address}>
        </div>

      </div>
        
      <div className={style.dashboardmenu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <LocationOnIcon
              fontSize="large"
              sx={{
                color: "var(--primary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>آدرس</h3>
          </div>
          <div className={style.score}><p>{salon.address}</p></div>
          <Divider flexItem />
          <Link> تو نقشه ببین</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <LocalPhoneIcon
              fontSize="large"
              sx={{
                color: "var(--primary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>شماره تماس</h3>
          </div>
          <div className={style.score}><p>{salon.phone_number}</p></div>
          <Divider flexItem />
          <Link>منتظر تماس شما هستیم</Link>
        </Paper>
      </div>
      </div>
    </div>
     <div style={{marginLeft : '200px', marginRight: '200px', marginBottom : '20px',marginTop : '0px' }}>
      <SalonBarbers salonid={salon.id} barberIDs={barberIDs} style={{display : 'flex'}} />
    </div>
    <Footer />
    </>
  );
};

export default SalonProfile;
