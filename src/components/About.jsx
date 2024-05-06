import style from "../styles/About.module.scss";
import { useState, useEffect } from "react";
import APIendPointLandingDown from "../API/APIendPointLandingDown";

const About = () => {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIendPointLandingDown();
        setApiData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className={style.about}
      id="about"
    >
      <div className={style.container}>
        <div className={style.col1}>
          <h3>درباره ما</h3>
          <p>{apiData.description}</p>
        </div>
        <div className={style.col2}>
          <img
            src={apiData.landing_image}
            alt="reserveto"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
