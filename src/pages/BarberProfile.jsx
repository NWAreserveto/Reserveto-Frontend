import Header from "../components/barberProfile/Header";
import Samples from "../components/barberProfile/Samples";
import Information from "../components/barberProfile/Information";
import Navbar from "../components/BarbersLandingNavbar";
import Services from "../components/barberProfile/Services";
import Comments from "../components/comments/Comments";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import APIendpointBarberProfile from "../API/APIendpointBarberProfile";
import BackGround from "../images/Back_1.png";
import Sample_1 from "../images/Sample_1.jpg";
import Sample_2 from "../images/Sample_2.jpg";
import Sample_3 from "../images/Sample_3.jpg";
import Sample_4 from "../images/Sample_4.jpg";
import Sample_5 from "../images/Sample_5.jpg";
import Sample_6 from "../images/Sample_2.jpg";
import Sample_7 from "../images/Sample_4.jpg";
import Sample_8 from "../images/Sample_5.jpg";

const BarberProfile = () => {
  const samples = [
    { img: Sample_1 },
    { img: Sample_2 },
    { img: Sample_3 },
    { img: Sample_4 },
    { img: Sample_5 },
    { img: Sample_6 },
    { img: Sample_7 },
    { img: Sample_8 },
  ];

  const barberIdList = window.location.href.split("/");
  const barberId = barberIdList[barberIdList.length - 1];

  const [barber, setBarber] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await APIendpointBarberProfile(barberId);
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

      <Information bio={barber.bio} />

      <Samples
        // samples={barber.samples}
        samples={samples}
      />

      <Services />


      <Comments 
        barberId={barber.id}
        barberName={barber.first_name + " " + barber.last_name}
      />

      <Footer />
    </>
  );
};

export default BarberProfile;
