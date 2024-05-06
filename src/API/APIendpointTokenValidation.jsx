import axios from "axios";
import { Navigate } from "react-router-dom";

const newPass = async (token) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com" });

  try {
    const response = await api.post(`/api/token_validation/`, token);

    if (response.status === 202) {
      Navigate(`./ForgetPass`);
      console.log(response.status);
			return true;
    } else {
      console.log(response.status);
			return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default newPass;
