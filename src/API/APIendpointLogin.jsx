import axios from "axios";

const LoginCOB = async (person) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

  try {
    const response = await api.post("/api/login/", person);

    if (response.status === 200) {
      console.log(response.status);
      
    } else {
      console.log(response.status);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default LoginCOB;
