import axios from "axios";

const signUpNewBarberAPI = async (barber) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/BarberSignup/",
    barber
  );

  if (response.status !== 201) {
    console.log(response.status);
    throw response.status;
  }
  console.log(response.status);

  // Handle error here, maybe display a message to the user
};

export default signUpNewBarberAPI;