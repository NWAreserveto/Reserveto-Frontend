import axios from "axios";

const GETBarberCommentsAPI = async (barberId) => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get(`api/barbers/${barberId}/reviews`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default GETBarberCommentsAPI;