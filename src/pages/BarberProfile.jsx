import React from "react";
import Header from '../components/BarberProfile_Header'
import Body from '../components/BarberProfile_Body'
import Footer from "../components/Footer";
import Comments from "../components/comments/Comments"
import GETBarberProfileAPI from "../API/APIendpointBarberProfile"


const BarberProfile = (id, name, city, backgroundImg, profileImg, point) => {
  return (
    <>
      <Header 
        name={name}
        city={city}
        backgroundImg={backgroundImg}
        profileImg={profileImg}
        point={point}
      />
      <Body />
      <Comments
        commentsUrl=""
        currentUserId="1"
      />
      <Footer />
      <button onClick={GETBarberProfileAPI}> click me</button>
    </>
  );
};


export default BarberProfile;