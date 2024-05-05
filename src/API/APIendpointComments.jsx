import axios from "axios";

const GETCommentsAPI = async () => {
  try {
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
    });

    const response = await api.get(`api/reviews`);

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default GETCommentsAPI;