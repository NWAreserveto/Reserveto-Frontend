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
import ReservesComponent from "../components/ReservesComponent"; // Import your custom components
import CommentsComponent from "../components/CommentsComponent";
import InterestsComponent from "../components/InterestsComponent";
import CustomerReservesList from "../components/UserReserves";
import BarbersLandingNavbar from "../components/BarbersLandingNavbar";
import CreateSalon from "../components/Createsalon";
import Barbersalons from "../components/Barber'salons";
import APIendpointBarber from "../API/APIendpointBarberProfile";
import APIgetSalon from "../API/APIendpointSalon"
import fetchSalonById from "../API/APIendpointSalon";

const BarberSalons = ({barberId}) => {
  const [salonIDs, setSalonIDs] = useState([]);
  const [barber , setBarber] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isCreateSalonActive, setIsEditProfileActive] = useState(false);
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  useEffect(() =>{
  const getbarber = async () => {
    try{
      setLoading(true);
      var data = await APIendpointBarber(12);
      var temp = String(data.salons).split(',');
      console.log(temp);
      setSalonIDs(temp);
      setBarber(data);
    }
    catch(err){
      console.log(err);
    }
  }
  getbarber();
},[]);


  const handleImageButtonClick = (index) => {
    console.log(index);
    setSelectedTab(index);
  };
  const toggleCreateSalon = () => {
    setIsEditProfileActive(!isCreateSalonActive); // Toggle edit profile mode
  };
  console.log("salonids unpassed is : " + salonIDs);
  return (
    <div className={style.userpage}>
        {/* <Navbar setIsHoverd={setIsHoverd} setSelectedTab={setSelectedTab}/> */}
        <div>
        <button onClick={toggleCreateSalon}>
            ایجاد سالن
        </button>
        </div>
        {isCreateSalonActive ? (
        <div className={style.editcontainer}>
        <CreateSalon />
        </div>
        ) : (
        <div>
          <Barbersalons barberid={12} salonids={salonIDs.filter(x => x.index != null)}/>
        </div>
      )
      }
        {/* <SalonServices/> */}
    </div>
)
};

export default BarberSalons;
