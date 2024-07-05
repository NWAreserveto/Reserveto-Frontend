import axios from "axios";

const updateSalonProfile = async (salonID, newData) => {
    try {
        const token = localStorage.getItem("token");
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    const response = await api.patch(`/api/salons/${salonID}/`, newData);

    if (response.status === 200) {
      console.log("Salon Profile updated successfully");
      return response.data;
    } else {
        console.log(response.data);
        console.log("Failed to update profile:", response.status);
        
      return null;
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export default updateSalonProfile;
