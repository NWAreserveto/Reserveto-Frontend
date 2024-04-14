import axios from "axios";

const LoginCOB = async (person) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

  try {
    const response = await api.post("/api/login/", person);

    if (response.status === 200) {
      // Login successful
      //   return response.data;
      console.log(response.status);
    } else {
      // If the login request was not successful
      //   throw new Error("Login failed");
      console.log(response.status);
    }
  } catch (error) {
    // Handle errors here, maybe display a message to the user
    console.error(error);
    throw error;
  }
};

export default LoginCOB;
