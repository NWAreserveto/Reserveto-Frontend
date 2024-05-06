import axios from "axios";

const GETBarberProfileAPI = async (barberId) => {
  try {
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/"
    });

    const response = await api.get(`api/barbers/profiles/${barberId}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response.status);
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default GETBarberProfileAPI;