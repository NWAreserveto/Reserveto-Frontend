import axios from "axios";

const UserProfile = async (userID) => {
  const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

  try {

    const response = await api.get(`/api/customers/profiles/${userID}`);

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

export default UserProfile;
