import BarbersCard from "../BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBookmarksList from "../../API/APIendpointBookmarksList";
import APIendpointBarbersList from "../../API/APIendpointBarbersList";
import style from "../../styles/BarbersList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Avatar, Box, Typography, Button } from "@mui/material";


const BookmarksList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       console.log(token);
  //       const responseData = await APIendpointBarbersList(token);
  //       setBarbers(responseData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [loading]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const responseData = await APIendpointBookmarksList();
          setBarbers(responseData);
          setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading]);

  return (
    <Box className={loading ? style.flex : style.barbersList}>
      {loading ? (
        <CircularProgress />
      ) : (
        barbers
          .slice(0, 10)
          .map((barber) => (
            <BarbersCard
              id={barber.id}
              name={barber.first_name + " " + barber.last_name}
              location={barber.location}
              profilePic={barber.profile_picture}
            />
          ))
      )}
    </Box>
  );
};

export default BookmarksList;