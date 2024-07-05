import React, { Component } from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Typography,
  BottomNavigation,
} from "@mui/material";
import Calendar from "./Calendar";
import ParentComponent from "./ParentPopup";
const Reserve = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <ParentComponent />
    </Box>
  );
};

export default Reserve;
