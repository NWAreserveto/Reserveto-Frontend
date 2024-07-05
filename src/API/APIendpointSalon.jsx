import axios from "axios";

const salonProfile = async (salonID) => {

  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get(`/api/salons/${salonID}/`);

    if (response.status === 200) {
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

export default salonProfile;
