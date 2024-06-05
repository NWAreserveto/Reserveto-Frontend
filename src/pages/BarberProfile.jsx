import Header from "../components/barberProfile/Header";
import Navbar from "../components/BarbersLandingNavbar";
import Comments from "../components/comments/Comments";
import Body from "../components/barberProfile/Body";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import BackGround from "../images/Back_1.png";

const BarberProfile = () => {

  const barberIdList = window.location.href.split("/");
  const barberId = barberIdList[barberIdList.length - 1];

  const [barber, setBarber] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETBarberProfileAPI(barberId);
        setBarber(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [barberId]);

  return (
    <>
      <Navbar />

      <Header
        first_name={barber.first_name}
        last_name={barber.last_name}
        location={barber.location}
        profileImg={barber.profile_picture}
        backgroundImg={BackGround}
        point={barber.point}
      />

      <Body barber={barber}/>

      <Comments 
        barberId={barber.id}
        barberName={barber.first_name + " " + barber.last_name}
      />

      <Footer />
    </>
  );
};

export default BarberProfile;
