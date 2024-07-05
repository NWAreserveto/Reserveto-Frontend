import React from "react";
import axios from "axios";
import { toArray } from "lodash";

const APIendpointAllServices = async () => {
  try {
    const token = localStorage.getItem("token");
    const api = axios.create({
      baseURL: "https://reserveto-back.onrender.com/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.get("api/allservices/");

    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response.status);
      throw new Error(`Request failed with status code ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default APIendpointAllServices;
