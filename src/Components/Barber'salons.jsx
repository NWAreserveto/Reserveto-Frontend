import React, { useEffect, useState } from 'react';
import Card from './SalonBarberCard';
import style from '../styles/salon.module.scss'
import APIgetSalon from "../API/APIendpointSalon"
import fetchSalonById from '../API/APIendpointSalon';


const SalonBarbers = ({salonIds,barberId}) => {
    const [salons,setSalons] = useState([]);
    const [salonIDs, setSalonIDs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreateSalonActive, setIsCreateSalonActive] = useState(false);
  const fetchAllSalons = async (salonIDs) => {
    try {
      const fetchPromises = salonIDs.map((id) => fetchSalonById(id));
      const salons = await Promise.all(fetchPromises);
      return salons.filter(salon => salon !== null);
    } catch (error) {
      console.error("Error fetching all barbers:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllSalons(salonIDs);
        setSalons(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const toggleCreateSalon = () => {
    setIsCreateSalonActive(!isCreateSalonActive); // Toggle edit profile mode
  };

  // if (loading) return <div>Loading...</div>;
  console.log("the id's are : " + salonIDs);
  if (error) return <div>Error: {error.message}</div>;
  if (!salonIDs.length) return <div>No salons found</div>;
  return (
    <div className={style.barber_list}>
      <h1>آرایشگران</h1>
      <div className={style.grid_container}>
      {salons.map((salon) => (
        <Card key={salon.id} barberIDs={salonIDs} salonid={barberId} id={salon.id} name={salon.name} location={salon.address} />
      ))}
      </div>
    </div>
  );
};

export default SalonBarbers;
