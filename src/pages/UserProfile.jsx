import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbox from "../components/NavBox";
import style from "../styles/Avatar.module.scss"
import Usernavbar from "../components/Usernavbar";
import Avatar from '../components/Avatar'; // Assuming you have an Avatar component
import Editprofile from "../components/editprofile";
import Footer from "../components/Footer";
import Info from '../components/info'; // Assuming you have an Info component
import profilePic from "../images//profilePic.jpg"
import axios from "axios";
import ReservesComponent from "../components/ReservesComponent"; // Import your custom components
import CommentsComponent from "../components/CommentsComponent";
import InterestsComponent from "../components/InterestsComponent";
import CustomerReservesList from "../components/UserReserves";

const UserProfile = (id) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [isEditProfileActive, setIsEditProfileActive] = useState(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const[user , setUser] = useState([]);

  useEffect(()=>{
    axios.get('https://reserveto-back.onrender.com/api/ ^customers/profiles/${id}').then(res=>{
      setUser(res.data)
    }).catch(err => {console.log(err)})
  },[]);

  const reserves = [
    { customer: 'John Doe', amount: '$1000' },
    { customer: 'Jane Smith', amount: '$1500' },
    // Add more reserve objects as needed
  ];
  // const user = {
  //   name: 'پرهام هدایتی',
  //   username: 'phd',
  //   email: 'johndoe@example.com',
  //   avatar : {profilePic},
  //   location: 'تهران،تهران',
  //   followers: 100,
  //   following: 50,
  //   posts: 20
  // };
  const handleImageButtonClick = (index) => {
    console.log(index);
    setSelectedTab(index);
  };

  const toggleEditProfile = () => {
    setIsEditProfileActive(!isEditProfileActive); // Toggle edit profile mode
  };

  return (
    <>
    {user.length ? 
    (
      <div className={style.userpage}>
        {/* <div className={style.mainhead} > */}
        <Navbar setLoginHovered={setIsLoginHovered} />
        <Avatar src={user.pi} alt={user.name} />
        {/* </div> */}
        {isEditProfileActive ? (
        <Editprofile/> // Render Editprofile component if edit profile mode is active
        ) : (
        <Navbox /> // Render Navbox component if edit profile mode is not active
        )}
        <Footer/>
      </div>

    )
  :
  (
    <div className={style.userpage}>
      <div className={style.mainhead} >
      <Navbar setLoginHovered={setIsLoginHovered} />
      <Avatar image={user.image} name={user.first_name +" " + user.last_name} location={user.address} onClick={toggleEditProfile} />
      </div>
      {isEditProfileActive ? (
        <div className={style.editcontainer}>
        <Editprofile />
        </div>
      ) : (
        <div>
        <Navbox handleImageButtonClick={handleImageButtonClick}/>
        <CustomerReservesList reserves={reserves} />
        {selectedTab === 0 && <ReservesComponent/> }
        {selectedTab === 1 && <InterestsComponent />} 
        {selectedTab === 2 && <CommentsComponent />}
      </div>
      )
      }
      <Footer/>
    </div>
  )}
    </>
  );
};

export default UserProfile;
