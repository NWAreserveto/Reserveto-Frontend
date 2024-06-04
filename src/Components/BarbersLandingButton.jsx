import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const BarbersLandingButton = () => {
  return (
    <Box
      sx={{
        pb: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        component={Link}
        to="/BarbersLanding/:id"
        variant="contained"
        color="primary"
        sx={{
          height: 200,
          width: 500,
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
        <Typography variant="h4">همه آرایشگران</Typography>
      </Button>
    </Box>
  );
};

export default BarbersLandingButton;