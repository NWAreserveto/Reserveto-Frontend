import axios from "axios";

const signUpNewBarberAPI = async (barber1) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com" });

  try {
    const response = await api.post("/api/BarberSignup/", barber1);
    if (response.status === 201) {
      console.log(response.status);
    } else {
      console.log(response.status);
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default signUpNewBarberAPI;
