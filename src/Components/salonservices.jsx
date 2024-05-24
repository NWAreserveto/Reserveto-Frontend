import React from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import servicesNail from "../images/services_nail.jpg"
import servicesDye from "../images/services_dye.jpg"
import style from "../styles/salon.module.scss"

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const salonservices = () => {
  return (
    <div className={style.SlideConstainer}>
        <h1>خدمات</h1>
    <Swiper
      className={style.swiperSlide}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
    >
      <SwiperSlide>
        <button onClick={() => console.log('Slide 1 clicked')} >
        <p>salam</p>
          <img src={servicesNail} alt="Image 1" className={style.swiperImage} />
        </button>
      </SwiperSlide>
      <SwiperSlide>
        <button onClick={() => console.log('Slide 2 clicked')}>
          <img src={servicesDye} alt="Image 2" className={style.swiperImage} />
        </button>
      </SwiperSlide>
      <SwiperSlide>
        <button onClick={() => console.log('Slide 3 clicked')}>
          <img src="image3.jpg" alt="Image 3" className={style.swiperImage}/>
        </button>
      </SwiperSlide>
    </Swiper>
    </div>
  );
};

export default salonservices;
