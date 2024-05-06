// APIendpointNewPassword.js
import axios from "axios";

const newPass = async (person12, tempToken) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com" });

  try {
    const response = await api.post(
      `/api/password_reset/${tempToken}/`,
      person12
    );

    if (response.status === 200) {
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

export default newPass;
