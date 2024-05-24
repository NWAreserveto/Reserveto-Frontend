import style from "../styles/Services.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useEffect } from "react";
import APIendPointLandingGifs from "../API/APIendPointLandingGifs";
import Animation from "./Animation";
import "swiper/css";
import "swiper/css/navigation";

const Services = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await APIendPointLandingGifs();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={style.services}
      id="services"
    >
      <div className={style.container}>
        <h3>خدمات</h3>
        <div className={style.swiper}>
          <Swiper
            style={{
              "--swiper-theme-color": "var(--secondary-color)",
              "--swiper-navigation-size": "32px",
            }}
            modules={[Navigation]}
            slidesPerView={6}
            navigation
          >
            {apiData &&
              apiData.length > 0 &&
              apiData.map((gif) => (
                <SwiperSlide className={style.swiperItem}>
                  <Animation
                    animationData={JSON.parse(gif.gif_json)}
                    title={gif.gif_name}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Services;
