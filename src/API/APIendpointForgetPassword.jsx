import axios from "axios";

const ResetPassword = async (person2) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com" });

  try {
    const response = await api.post("/api/password_reset_request/", person2);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default ResetPassword;
