import axios from "axios";

const signUpNewBarberAPI = async (barber1) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com" });
  const response = await api.post("/api/BarberSignup/", barber1);

  if (response.status !== 201) {
    console.log(response.status);
    throw response.status;
  }
  console.log(response.status);
  // throw Error(response.data);

  // Handle error here, maybe display a message to the user
};

export default signUpNewBarberAPI;
