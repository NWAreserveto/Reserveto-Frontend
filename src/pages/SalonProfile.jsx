import { useEffect, useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Navbox from "../components/NavBox";
import SalonAvatar from "../components/Salonavatar"
import SalonServices from "../components/salonservices"
import SalonBarbers from "../components/SalonBarbers";
import style from "../styles/Avatar.module.scss"
import Usernavbar from "../components/Usernavbar";
import Avatar from '../components/Avatar'; // Assuming you have an Avatar component
import EditSalonprofile from "../components/EditSalonProfile";
import Footer from "../components/Footer";
import Info from '../components/info'; // Assuming you have an Info component
import profilePic from "../images//profilePic.jpg"
import axios from "axios";
import APIendpointUser from "../API/APIendpointUser";
import ReservesComponent from "../components/ReservesComponent"; // Import your custom components
import CommentsComponent from "../components/CommentsComponent";
import InterestsComponent from "../components/InterestsComponent";
import CustomerReservesList from "../components/UserReserves";
import BarbersLandingNavbar from "../components/BarbersLandingNavbar";
import APIgetSalon from "../API/APIendpointSalon"

const SalonProfile = () => {
  const [salon,setSalon] = useState([]);
  const [barberIDs, setBarberIDs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

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
          setBarberIDs(String(data.barbers).split(','));
          console.log("ids : " + String(data.barbers).split(','));
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
  const handleImageButtonClick = (index) => {
    console.log(index);
    setSelectedTab(index);
  };
  const toggleEditProfile = () => {
    setIsEditProfileActive(!isEditProfileActive); // Toggle edit profile mode
  };
  console.log("salon id is : " + salon.id);
  console.log("salon name is : " + salon.name);

  return (
    <div className={style.userpage}>
        <SalonAvatar salon={salon} onClick={toggleEditProfile}/>
        {isEditProfileActive ? (
        <div className={style.editcontainer}>
        <EditSalonprofile salon={salon} />
        </div>
        ) : (
        <div className={style.barbers}>
          <SalonBarbers salonid={salon.id} barberIDs={barberIDs}/>
      </div>
      )
      }
        {/* <SalonServices/> */}
    </div>
)
};

export default SalonProfile;
