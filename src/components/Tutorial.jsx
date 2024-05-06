import style from "../styles/Tutorial.module.scss";
import Tutorial1 from "../images/tutorial1.svg";
import Tutorial2 from "../images/tutorial2.svg";
import Tutorial3 from "../images/tutorial3.svg";
import Tutorial4 from "../images/tutorial4.svg";

import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import { Bs3CircleFill } from "react-icons/bs";
import { Bs4CircleFill } from "react-icons/bs";
import APIendPointLandingMid from "../API/APIendPointLandingMid";
import { useEffect, useState } from "react";

const Tutorial = () => {
  const [apiData, setApiData] = useState([]);
  const steps = [Bs1CircleFill, Bs2CircleFill, Bs3CircleFill, Bs4CircleFill];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIendPointLandingMid();
        data.sort((a, b) => a.id - b.id);
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className={style.tutorial}
      id="tutorial"
    >
      <h3>نحوه رزرو</h3>
      <div className={style.container}>
        {apiData.map((item) => (
          <div className={style.item}>
            {steps[item.id]}
            <img
              src={item.landing_image}
              alt={`step ${item.id}`}
            />
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
