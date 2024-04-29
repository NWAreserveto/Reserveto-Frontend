import axios from "axios";

const newPass = async (person12, token) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com" });

  try {
    const response = await api.post(`/api/password_reset/${token}`, person12);

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

export default newPass;
