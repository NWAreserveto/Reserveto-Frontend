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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNzEzMDIzLCJpYXQiOjE3MTM3MTAzMjMsImp0aSI6IjJjNzc3Y2QxZDQ3NjRkYzM4NzQyOGQ1ZGZjYjBjOWQ0IiwidXNlcl9pZCI6MTJ9.b9GwraR5ukK9BJEcc-ibWkq9Orz5w588yhQ05s-wm0k";
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
