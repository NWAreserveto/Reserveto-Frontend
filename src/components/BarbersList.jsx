import BarbersCard from "./BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBarbersList from "../API/APIendpointBarbersList";
import style from "../styles/BarbersList.module.scss";

const BarbersList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNzA0MDA4LCJpYXQiOjE3MTM3MDEzMDgsImp0aSI6ImEzMmFmYmQyMTAxNzQwZTU4YjI5YmNhODVmMjJhY2U3IiwidXNlcl9pZCI6MTJ9.hbjWzzL6e3DE8ergO5-VszZ0XWhunpp8s2tP-D2gNqQ";
        const responseData = await APIendpointBarbersList(token);
        setData(responseData);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={style.barbersList}>
      <BarbersCard
        name={"کوشا لاهوتی"}
        location={"کرج"}
      />
      <BarbersCard
        name={"کوشا لاهوتی"}
        location={"کرج"}
      />
      <BarbersCard
        name={"کوشا لاهوتی"}
        location={"کرج"}
      />
      <BarbersCard
        name={"کوشا لاهوتی"}
        location={"کرج"}
      />
      <BarbersCard
        name={"کوشا لاهوتی"}
        location={"کرج"}
      />
      <BarbersCard
        name={"کوشا لاهوتی"}
        location={"کرج"}
      />
    </div>
  );
};

export default BarbersList;
