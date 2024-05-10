import React from "react";
import style from "../../styles/Popup.module.scss";
import Calendar from "./Calendar";

const Popup = () => {
  return (
    <div className={style.popupContainer}>
      {/* <h2>Popup Content</h2>
        <p>This is the content of the popup.</p> */}
      <Calendar />
      <button className={style.closeButton}>
        بستن
      </button>
    </div>
  );
};

export default Popup;
