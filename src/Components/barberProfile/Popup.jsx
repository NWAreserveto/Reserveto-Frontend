import React, { useState } from "react";
import style from "../../styles/Popup.module.scss";
import Calendar from "./Calendar";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const Popup = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={style.popupContainer}>
          <IconButton onClick={handleClose} className={style.closeButton}>
            <CloseIcon />
          </IconButton>
          <Calendar />
        </div>
      )}
    </>
  );
};

export default Popup;
