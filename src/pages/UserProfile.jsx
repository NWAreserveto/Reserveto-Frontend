import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Navbox from "../components/NavBox";
import style from "../styles/Avatar.module.scss"
import Usernavbar from "../components/Usernavbar";
import Avatar from '../components/Avatar'; // Assuming you have an Avatar component
import Editprofile from "../components/edirprofile";
import Footer from "../components/Footer";
import Info from '../components/info'; // Assuming you have an Info component
import profilePic from "../images//profilePic.jpg"
import axios from "axios";

const UserProfile = () => {
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const[users , setUser] = useState([]);

  useEffect(()=>{
    axios.get('').then(res=>{setUser(res.data)}).catch(err => {console.log(err)})
  },[]);


  const user = {
    name: 'پرهام هدایتی',
    username: 'phd',
    email: 'johndoe@example.com',
    avatar : {profilePic},
    location: 'تهران،تهران',
    followers: 100,
    following: 50,
    posts: 20
  };

  return (
    <div style={{backgroundColor: "white", textAlign : "right",justifyContent : "right", marginRight : "5%",marginLeft :"5%"}} className="user-profile">
      <div className={style.mainhead} >
      <Navbar setLoginHovered={setIsLoginHovered} />
      <Avatar src={profilePic} alt={user.name} />
      </div>
      <Navbox/>
      {/* <Editprofile/> */}
      <Footer/>
    </div>
  );
};

export default UserProfile;