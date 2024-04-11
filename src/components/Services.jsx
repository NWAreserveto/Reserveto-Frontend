import style from "../styles/Services.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Animation from "./Animation";
import "swiper/css";
import "swiper/css/navigation";

import ShaveAnimationData from "../images/Shaving.json";
import BarberAnimationData from "../images/Barber.json";
import SpaAnimationData from "../images/Spa.json";
import MassageAnimationData from "../images/Massage.json";
import NailAnimationData from "../images/Nail.json";
import MakeupAnimationData from "../images/Makeup.json";
import EyelashAnimationData from "../images/Eyelash.json";
import HairWashingAnimationData from "../images/HairWashing.json";

const Services = () => {
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
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={ShaveAnimationData}
                title={"اصلاح صورت"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={BarberAnimationData}
                title={"اصلاح مو"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={SpaAnimationData}
                title={"اسپا"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={MassageAnimationData}
                title={"ماساژ"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={NailAnimationData}
                title={"ناخن"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={MakeupAnimationData}
                title={"آرایش"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={EyelashAnimationData}
                title={"مژه"}
              />
            </SwiperSlide>
            <SwiperSlide className={style.swiperItem}>
              <Animation
                animationData={HairWashingAnimationData}
                title={"شست وشو مو"}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Services;
