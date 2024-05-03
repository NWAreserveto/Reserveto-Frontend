import style from "../styles/Tutorial.module.scss";
import Tutorial1 from "../images/tutorial1.svg";
import Tutorial2 from "../images/tutorial2.svg";
import Tutorial3 from "../images/tutorial3.svg";
import Tutorial4 from "../images/tutorial4.svg";

import { Bs1CircleFill } from "react-icons/bs";
import { Bs2CircleFill } from "react-icons/bs";
import { Bs3CircleFill } from "react-icons/bs";
import { Bs4CircleFill } from "react-icons/bs";

const Tutorial = () => {
  return (
    <div
      className={style.tutorial}
      id="tutorial"
    >
      <h3>نحوه رزرو</h3>
      <div className={style.container}>
        <div className={style.item}>
          <Bs1CircleFill />
          <img
            src={Tutorial1}
            alt="انتخاب سرویس"
          />
          <p>انتخاب خدمت و آرایشگر</p>
        </div>
        <div className={style.item}>
          <Bs2CircleFill />
          <img
            src={Tutorial2}
            alt="انتخاب زمان"
          />
          <p>انتخاب تاریخ و زمان</p>
        </div>
        <div className={style.item}>
          <Bs3CircleFill />
          <img
            src={Tutorial3}
            alt="انتخاب سرویس"
          />
          <p>اضافه کردن درخواست‌های ویژه</p>
        </div>
        <div className={style.item}>
          <Bs4CircleFill />
          <img
            src={Tutorial4}
            alt="انتخاب سرویس"
          />
          <p>تکمیل رزرو و دریافت تأیید</p>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
