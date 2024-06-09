import { useEffect, useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Navbox from "../components/NavBox";
import style from "../styles/Avatar.module.scss"
import Usernavbar from "../components/Usernavbar";
import Avatar from '../components/Avatar'; // Assuming you have an Avatar component
import Editprofile from "../components/editprofile";
import Footer from "../components/Footer";
import Info from '../components/info'; // Assuming you have an Info component
import profilePic from "../images//profilePic.jpg"
import axios from "axios";
import APIendpointUser from "../API/APIendpointUser";
import ReservesComponent from "../components/ReservesComponent"; // Import your custom components
import CommentsComponent from "../components/CommentsComponent";
import InterestsComponent from "../components/InterestsComponent";
import CustomerReservesList from "../components/UserReserves";

const UserProfile = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const[user , setUser] = useState();
  const [userid,setuserid] = useState();
  

  useEffect(()=> {
    const fetchData = async () => {
      const userList = window.location.href.split("/");
      const id = userList[userList.length - 1];
      setuserid(id);
      setLoading(true);
      var temp = await APIendpointUser(id);
      setUser(temp);
      setLoading(false);
      console.log(temp);
    }
    fetchData();
  },[]);
  

  const reserves = [
    { customer: 'John Doe', amount: '$1000' },
    { customer: 'Jane Smith', amount: '$1500' },
    // Add more reserve objects as needed
  ];
  const handleImageButtonClick = (index) => {
    console.log(index);
    setSelectedTab(index);
  };

  const toggleEditProfile = () => {
    setIsEditProfileActive(!isEditProfileActive); // Toggle edit profile mode
  };
  

  return (
    <div className={style.userpage}>
      <div className={style.mainhead} >
      <Navbar setIsHoverd={setIsHoverd} setSelectedTab={setSelectedTab}/>
      <Avatar user={user} onClick={toggleEditProfile} />
      </div>
      {isEditProfileActive ? (
        <div className={style.editcontainer}>
        <Editprofile user={user} />
        </div>
      ) : (
        <div>
        <Navbox userid={userid} handleImageButtonClick={handleImageButtonClick}/>
        {/* <CustomerReservesList reserves={reserves} /> */}
        {/* {selectedTab === 0 && <ReservesComponent/> }
        {selectedTab === 1 && <InterestsComponent />} 
        {selectedTab === 2 && <CommentsComponent />} */}
      </div>
      )
      }
      <Footer/>
    </div>
)
};

export default UserProfile;
