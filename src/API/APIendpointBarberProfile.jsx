import axios from "axios";

const baseURL = "https://reserveto-back.onrender.com";

const GETBarberProfileAPI = (id) => {
  // axios.get(baseURL + `/api/barbers/profiles/${id}`)
  // axios.get(baseURL + `/api/barbers/profiles/2/`)
  axios.get(`https://reserveto-back.onrender.com/api/barbers/profiles/2/`)
    .then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

};

export default GETBarberProfileAPI;
