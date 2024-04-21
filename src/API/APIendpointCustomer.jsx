import axios from "axios";



const signUpNewCustomerAPI = async (customer1) => {
  const api = axios.create({baseURL: "https://reserveto-back.onrender.com"})
  const response = await api.post(
    "/api/CustomerSignup/",
    customer1
  );

  if (response.status !== 201) {
    console.log(response.status);
    throw response.status;
  }
  console.log(response.status);

  // Handle error here, maybe display a message to the user
};

export default signUpNewCustomerAPI;