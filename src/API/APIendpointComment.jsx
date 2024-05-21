import axios from "axios";

const POSTCommentAPI = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.post("api/reviews/", {
      comment: data.comment,
      rating: data.rating
    });

    if (response.status !== 201) {
      throw new Error("Failed to post comment");
    }

  } catch (error) {
    console.error(error);
  }
};

export default POSTCommentAPI;