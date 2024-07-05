import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ParentComponent = ({ barber }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log(
        localStorage.getItem("role"),
        localStorage.getItem("barberId"),
        barber.id
      );
      if (
        localStorage.getItem("role") == "barber" &&
        localStorage.getItem("barberId") == barber.id
      )
        setIsMe(true);
      else setIsMe(false);
    };
    fetchData();
  }, [barber]);

  const navigate = useNavigate();

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 2,
        zIndex: 1000
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          if (isMe) navigate(`/Barber/Dashboard/${barber.id}`);
          else setIsPopupOpen(!isPopupOpen);
        }}
        sx={{
          height: 80,
          width: 250,
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(45deg, var(--primary-color) 30%, var(--secondary-color) 90%)",
          boxShadow: "0 3px 5px 2px rgba(0,0,0,0.2)",
          borderRadius: 4,
          color: "white",
          "&:hover": {
            background:
              "linear-gradient(45deg, var(--secondary-color) 30%, var(--primary-color) 90%)",
            boxShadow: "0 6px 10px 4px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Typography variant="h4" fontSize={22}>
          {isMe ? "داشبورد من" : "برای رزرو کلیک کنید"}
        </Typography>
      </Button>
      {isPopupOpen && <Popup onClose={closePopup} />}
    </Box>
  );
};

export default ParentComponent;