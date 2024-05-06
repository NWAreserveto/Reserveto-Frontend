import React from "react";
import { Box, Typography } from "@mui/material";

const Information = ({ bio }) => {
  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          margin: "0 20px",
          backgroundColor: "#e8dbc4",
          borderRadius: 8,
          width: "1260px",
          height: { bio },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            display: "inline",
            pr: 6,
            fontSize: 26,
            mt: 3,
          }}
        >
          درباره من
        </Typography>
        <Typography
          sx={{
            padding: "30px 50px",
            fontSize: 18,
          }}
        >
          {bio}
        </Typography>
      </Box>
    </Box>
  );
};

export default Information;