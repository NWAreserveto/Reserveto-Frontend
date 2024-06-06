import React, { useState } from "react";
import Popup from "./Popup";
import { Box, Typography } from "@mui/material";

const ParentComponent = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Box
      sx={{
        mt: 6,
      }}
    >
      <button
        variant="contained"
        onClick={() => {
          setIsPopupOpen(!isPopupOpen);
        }}
        style={{
          backgroundColor: "var(--secondary-color)",
          borderRadius: 8,
          width: "10%",
          height: "20%",
        }}
      >
        رزرو
      </button>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </Box>
  );
};

export default ParentComponent;
