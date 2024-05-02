import BarbersCard from "./BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBarbersList from "../API/APIendpointBarbersList";
import style from "../styles/BarbersList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "../images/Back.png";

const BarbersList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const responseData = await APIendpointBarbersList(token);
        setBarbers(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={loading ? style.flex : style.barbersList}>
      {loading ? (
        <CircularProgress />
      ) : (
        barbers.map((barber) => (
          <BarbersCard
            key={barber.id}
            id={barber.id}
            name={barber.first_name + barber.last_name}
            location={barber.location}
            profilePic={barber.profile_picture}
          />
        ))
      )}
    </div>
  );
};

export default BarbersList;
