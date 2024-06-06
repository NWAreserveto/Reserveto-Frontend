import axios from "axios";

const LoginCOB = async (person) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

  try {
    const response = await api.post("/api/login/", person);

    if (response.status === 200) {
      console.log(response.status);
      console.log(response.data.access);

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("role", response.data.role);
      if (response.data.role === "barber")
        localStorage.setItem("barberId", response.data.Barber.id);
      else
        localStorage.setItem("userId", response.data.Customer.id);
    } else {
      console.log(response.status);
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default LoginCOB;
