import axios from "axios";

const APIendpointSearchBarber = async (searchQuery) => {
  try {
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
    });

    const response = await api.get(
      `/api/barbers/profiles/?search=${searchQuery}`
    );

    if (response.status == 200) {
      console.log(response.status);
      return response.data;
    } else {
      console.log(response.status);
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default APIendpointSearchBarber;
