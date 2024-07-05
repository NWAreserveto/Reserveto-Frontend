import Header from "../components/barberProfile/Header";
import Navbar from "../components/BarbersLandingNavbar";
import Comments from "../components/comments/Comments";
import Body from "../components/barberProfile/Body";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import BackGround from "../images/Back_2.png";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const BarberProfile = () => {
  const barberIdList = window.location.href.split("/");
  const barberId = Number(barberIdList[barberIdList.length - 1]);

  const [barber, setBarber] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await GETBarberProfileAPI(barberId);
        setBarber(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [barberId]);

  return (
    <>
      <Navbar />

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            sx={{
              size: 60,
            }}
            color="success"
          />

        </Box>
      )}

      {!loading && (
        <Header
          first_name={barber.first_name}
          last_name={barber.last_name}
          location={barber.location}
          profileImg={barber.profile_picture}
          backgroundImg={BackGround}
          point={barber.point}
        />
      )}

      {!loading && <Body barber={barber} />}

      <Footer />
    </>
  );
};

export default BarberProfile;
