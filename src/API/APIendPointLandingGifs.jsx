import axios from "axios";

const APIendPointLandingGifs = async (person) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

  try {
    const response = await api.get("/api/LandingGifs");

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default APIendPointLandingGifs;
