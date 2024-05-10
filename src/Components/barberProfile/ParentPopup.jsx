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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#e8dbc4",
          borderRadius: 8,
          padding: 4,
          width: "1260px",
        }}
      >
        <Typography
          sx={{
            fontSize: 26,
            padding: 2,
            mt: -2,
            mr: 1,
          }}
        >
          رزرو سرویس
        </Typography>
        <button
          variant="contained"
          onClick={openPopup}
          style={{
            backgroundColor: "var(--secondary-color)",
            borderRadius: 8,
            height: "40px",
            width: "50%",
          }}
        >
          رزرو
        </button>
        {isPopupOpen && <Popup onClose={closePopup} />}
      </Box>
    </Box>
  );
};

export default ParentComponent;
