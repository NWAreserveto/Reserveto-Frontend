// import axios from "axios";

// const newPass = async (person) => {
//   const api = axios.create({ baseURL: "https://reserveto-back.onrender.com/" });

//   try {
//     const response = await api.post("/api/passwordreset/:token", person);

//     if (response.status === 200) {
//       console.log(response.status);
//     } else {
//       console.log(response.status);
//     }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export default LoginCOB;

import axios from "axios";

const APINewPassword = async (token) => {
  try {
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get("/api/passwordreset");
    localStorage.setItem("token", response.data.access);

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

export default APINewPassword;
