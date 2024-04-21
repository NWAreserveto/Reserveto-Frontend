import BarbersCard from "./BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBarbersList from "../API/APIendpointBarbersList";
import style from "../styles/BarbersList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const BarbersList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNzEwMDY1LCJpYXQiOjE3MTM3MDczNjUsImp0aSI6IjhlYmE3NzE3NDQxNzQ2NTg4ZjYzMDYyNTMzMmZhZGE3IiwidXNlcl9pZCI6MTJ9.XkcDCffalRSB8dOmQZ-G34yLk_3dmA2pBZXcQ7YGy0c";
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
            name={barber.first_name + barber.last_name}
            location={barber.location}
            // profilePicture={barber.profile_picture}
          />
        ))
      )}
    </div>
  );
};

export default BarbersList;
