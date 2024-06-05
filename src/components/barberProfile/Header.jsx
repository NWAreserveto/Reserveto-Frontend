import React from "react";
import { Avatar, Box, CardMedia, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GradeIcon from "@mui/icons-material/Grade";

const Header = ({
  first_name,
  last_name,
  location,
  profileImg,
  backgroundImg,
  point,
}) => {
  return (
    <Box sx={{
      mb: 2,
    }}>
      <Box // background picture
        sx={{
          mt: "5%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          sx={{
            margin: "0 20px",
            height: "250px",
            width: "1260px",
            borderRadius: "20px",
          }}
          image={backgroundImg}
        ></CardMedia>
      </Box>

      <Box //   profile picture of barber
        sx={{
          mt: "-120px",
          pr: { xs: 9, lg: 15, xl: 32 },
        }}
      >
        <Avatar
          src={profileImg}
          sx={{
            border: "solid 6px white",
            height: "150px",
            width: "150px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        />
      </Box>

      <Box // barber name and score
        sx={{
          mt: "-135px",
          pr: { xs: 31.5, lg: 40, xl: 56 },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { sm: 24, lg: 28 },
          }}
        >
          {first_name + " " + last_name}
        </Typography>
      </Box>

      <Box // Location
        sx={{
          display: "flex",
          marginTop: 1,
        }}
      >
        <Box // location icon
          sx={{
            color: "white",
            fontSize: { xs: 31, sm: 32, md: 33, lg: 34 },
            pr: { xs: 32, lg: 40, xl: 56.5 },
          }}
        >
          <LocationOnIcon />
        </Box>

        <Typography // location name
          sx={{
            color: "white",
            mt: 0.3,
            fontSize: { xs: 18, lg: 20 },
            pr: 1,
          }}
        >
          {location}
        </Typography>
      </Box>

      <Box // Score
        sx={{
          direction: "ltr",
          display: "flex",
          mt: -7,
          pl: { xs: 10, lg: 25, xl: 40 },
        }}
      >
        <Typography
          sx={{
            mt: { xs: -0.3, lg: -1 },
            color: "white",
            fontSize: { xs: 20, lg: 28 },
            pr: 1.5,
          }}
        >
          {point ? point : "??"}
        </Typography>
        <Box // score icon
          sx={{
            color: "white",
          }}
        >
          <GradeIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;