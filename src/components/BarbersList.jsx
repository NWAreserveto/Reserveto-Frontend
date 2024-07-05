import BarbersCard from "./BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBarbersList from "../API/APIendpointBarbersList";
import APIendpointSearchBarber from "../API/APIendpointSearchBarber";
import style from "../styles/BarbersList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";

const BarbersList = ({ searchQuery, customerId }) => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [searchQuery]);

  return (
    <div className={loading ? style.flex : style.barbersList}>
      {loading ? (
        <CircularProgress color="success" />
      ) : (
        barbers
          .slice(0, 10)
          .map((barber) => (
            <BarbersCard
              key={barber.id}
              id={barber.id}
              name={barber.first_name + " " + barber.last_name}
              location={barber.location}
              profilePic={barber.profile_picture}
              customerId={customerId}
              average_rating={barber.average_rating}
            />
          ))
      )}
    </div>
  );
};

export default BarbersList;
