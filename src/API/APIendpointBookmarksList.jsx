import axios from "axios";

const APIendpointBookmarksList = async () => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const userId = localStorage.getItem("userId");
    const response = await api.get(`/api/bookmarks/${userId}`);

    if (response.status === 200) {
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

export default APIendpointBookmarksList;