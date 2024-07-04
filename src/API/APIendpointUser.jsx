import axios from "axios";

const UserProfile = async (userID) => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get(`/api/customers/profiles/${userID}/`);

    if (response.status === 200) {
      console.log(response.status);
      localStorage.setItem("barberId", response.data.id);
      console.log(response.data.id);
      return response.data;
    } else {
      console.log(response.status);
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default UserProfile;