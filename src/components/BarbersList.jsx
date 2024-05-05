import BarbersCard from "./BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBarbersList from "../API/APIendpointBarbersList";
import APIendpointSearchBarber from "../API/APIendpointSearchBarber";
import style from "../styles/BarbersList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const BarbersList = ({ searchQuery }) => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(searchQuery);
        if (searchQuery === "") {
          const token = localStorage.getItem("token");
          console.log(token);
          const responseData = await APIendpointBarbersList(token);
          setBarbers(responseData);
          setLoading(false);
        } else {
          setLoading(true);
          const responseData = await APIendpointSearchBarber(searchQuery);
          setBarbers(responseData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.flex}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={style.flex}>
          {barbers.slice(0, 4).map(
            (
              barber // Only first 8 items
            ) => (
              <BarbersCard
                id={barber.id}
                name={barber.first_name + " " + barber.last_name}
                location={barber.location}
                // profilePicture={barber.profile_picture}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default BarbersList;
