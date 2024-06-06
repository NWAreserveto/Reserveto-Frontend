import React, { useState } from "react";
import Popup from "./Popup";
import { Box, Typography, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mt: 4,
      // pr: 70,
    }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsPopupOpen(!isPopupOpen);
        }}
        sx={{
          height: 80,
          width: 250,
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
          boxShadow: "0 3px 5px 2px rgba(0,0,0,0.2)",
          borderRadius: 10,
          color: "white",
          "&:hover": {
            background:
              "linear-gradient(45deg, var(--secondary-color) 30%, var(--primary-color) 90%)",
            boxShadow: "0 6px 10px 4px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Typography variant="h4" fontSize={22} >برای رزرو کلیک کنید</Typography>
      </Button>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </Box>
  );
};

export default ParentComponent;
