import React, { useState } from "react";
import Popup from "./Popup";
import { Box, Typography, Button } from "@mui/material";

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
        left: 0,
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          setIsPopupOpen(!isPopupOpen);
        }}
        sx={{
          backgroundColor: "var(--secondary-color)",
          "&:hover": {
            backgroundColor: "var(--secondary-color-lighter)",
          },

          width: "10%",
          display: "flex",
        }}
      >
        رزرو
      </Button>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </Box>
  );
};

export default ParentComponent;
