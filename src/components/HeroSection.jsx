import { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import style from "../styles/HeroSection.module.scss";
import APIendPointLandingUp from "../API/APIendPointLandingUp";

const HeroSection = ({ isLoginHovered}) => {
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIendPointLandingUp();
        setApiData(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={style.hero}
      id="hero"
    >
      <div className={style.container}>
        <div className={style.col1}>
          <p>{apiData.hero_section_title}</p>
          <p>{apiData.hero_section_description}</p>
        </div>
        {isLoginHovered ? (
          <img
            alt="hero"
            src={apiData.hero_section_image2}
          />
        ) : (
          <img
            alt="hero"
            src={apiData.hero_section_image1}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
