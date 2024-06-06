import React, { useEffect, useState } from 'react';
import Card from './SalonBarberCard';
import style from '../styles/salon.module.scss'
import APIgetSalon from "../API/APIendpointSalon"
import fetchBarberById from '../API/APIendpointBarberProfile';
import {Divider} from "@material-ui/core";
import tempPpicture from "../images/LoginBackground.jpg"


const SalonBarbers = ({salonid , barberIDs}) => {
  const [barbers, setBarbers] = useState([]);
  const [salon,setSalon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //const barberIDs = [2,3];
  const fetchAllBarbers = async (barberIDs) => {
    try {
      const fetchPromises = barberIDs.map((id) => fetchBarberById(id));
      const barbers = await Promise.all(fetchPromises);
      return barbers.filter(barber => barber !== null);
    } catch (error) {
      console.error("Error fetching all barbers:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllBarbers(barberIDs);
        setBarbers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) return <div>Loading...</div>;
  console.log("the id's are : " + barberIDs);
  if (error) return <div>Error: {error.message}</div>;
  if (!barberIDs.length) return <div>No barbers found</div>;
  return (
    <div className={style.barber_list}>
      <h1>آرایشگران</h1>
      <Divider
            flexItem
            variant="middle"
            sx={{
              borderBottomWidth: "1px",
              borderBottomColor: "var(--primary-color)",
              mt : '10px',
              mb : '10px'
            }}
          />
      <div className={style.grid_containerr}>
      {barbers.map((barber) => (
        <Card key={barber.id} barberIDs={barberIDs} profilePic={barber.profilePic} salonid={salonid} id={barber.id} name={barber.first_name + " " + barber.last_name} location={barber.address} />
      ))}
      </div>
    </div>
  );
};

export default SalonBarbers;
