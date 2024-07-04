import axios from "axios";

const Reserves = async (userId) => {

  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get(`/api/C_orders/${userId}/`);

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

export default Reserves;