import React, { Component } from "react";
import {
  Avatar,
  Box,
  CardMedia,
  Typography,
  BottomNavigation,
} from "@mui/material";
import Calendar from "./Calendar";

const Reserve = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        marginRight: "40rem",
      }}
    >
      <Calendar />
    </Box>
  );
};

export default Reserve;
