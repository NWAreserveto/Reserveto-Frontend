import axios from "axios";

const POSTReplyAPI = async (data) => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.post(
      `api/reviews/${data.commentId}/responses/`,
      {
        reply: data.reply,
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to post comment");
    }
  } catch (error) {
    console.error(error);
  }
};

export default POSTReplyAPI;