import React, { useState } from "react";
import axios from "axios";

const signUpNewCustomerAPI = async (customer1) => {
  const response = await axios.post(
    "http://127.0.0.1:8000/api/CustomerSignup/",
    customer1
  );

  if (response.status !== 201) {
    console.log(response.status);
    throw response.status;
  }
  console.log(response.status);

  // Handle error here, maybe display a message to the user
};

export default signUpNewCustomerAPI;