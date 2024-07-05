import axios from "axios";

const GETBarberGalleryAPI = async (barberId) => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      proxy: true,
    });

    const response = await api.get(`api/barbers/${barberId}/gallery/`);

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

export default GETBarberGalleryAPI;