import axios from "axios";

const BarberProfile = async (barberID) => {

  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get(`/api/barbers/profiles/${barberID}/`);

    if (response.status === 200) {
      console.log(response.status);
      return response.data;
      
    } else {
      console.log(response.status);
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default BarberProfile;
