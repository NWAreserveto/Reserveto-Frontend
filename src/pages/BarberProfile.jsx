import React from "react";
import Header from '../components/BarberProfile_Header'
import Body from '../components/BarberProfile_Body'
import Footer from "../components/Footer";
import Comments from "../components/comments/Comments"


const BarberProfile = () => {
  return (
    <>
      <Header />
      <Body />
      <Comments
        commentsUrl=""
        currentUserId="1"
      />
      <Footer />
    </>
  );
};


export default BarberProfile;