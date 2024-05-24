import axios from "axios";

const deleteSalonProfile = async (salonid) => {
    try {
        const token = localStorage.getItem("token");
        const api = axios.create({
          baseURL: "https://reserveto-back.onrender.com/",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

    const response = await api.delete(`/api/salons/${salonid}`);

    if (response.status === 200) {
      console.log("Salon deleted successfully");
      return response.data;
    } else {
        console.log(response.data);
        console.log("Failed to delete salon:", response.status);
        
      return null;
    }
  } catch (error) {
    console.error("Error deleting salon:", error);
    throw error;
  }
};

export default deleteSalonProfile;
