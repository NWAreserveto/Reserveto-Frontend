import axios from "axios";

const newPass = async (person) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

  try {
    const response = await api.post("/api/passwordreset/:token", person);

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
