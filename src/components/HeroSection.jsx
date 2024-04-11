import { useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import style from "../styles/HeroSection.module.scss";
import Hero from "../images/Hero.png";
import HeroHoverd from "../images/HeroHover.png";

const HeroSection = ({ isLoginHovered }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // const response = await fetch("");
      // const data = await response.json();
      // setApiData(data);
      // setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div
      className={style.hero}
      id="hero"
    >
      <div className={style.container}>
        <div className={style.col1}>
          <p>زیبایی را رزرو کنید</p>
          <p>وقت خود را به راحتی برنامه‌ریزی کنید</p>
        </div>
        {isLoginHovered ? (
          <img
            alt="hero"
            src={HeroHoverd}
          />
        ) : (
          <img
            alt="hero"
            src={Hero}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
