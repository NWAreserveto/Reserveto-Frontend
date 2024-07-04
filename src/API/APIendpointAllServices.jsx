import axios from "axios";

const GETAllServicesAPI = async () => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get(`api/allservices/`);

    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default GETAllServicesAPI;