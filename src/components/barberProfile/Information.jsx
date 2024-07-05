import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import Divider from "@material-ui/core/Divider";
import ParentComponent from "./ParentPopup";
import { Navigate, useNavigate } from "react-router-dom";
import BarberShopIcon from "../../images/barber-shop-icon.png";

const Information = ({ barber, salonName }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box //   profile picture of barber
        sx={{
          mb: "-160px",
          pr: 4,
        }}
      >
        <Avatar
          src={barber.profile_picture}
          sx={{
            border: "solid 6px white",
            height: "100px",
            width: "100px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        />
      </Box>

      <Box // full box
        sx={{
          mt: 15,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "var(--primary-color-lighter)",
            borderRadius: 8,
            width: "1260px",
            height: barber.bio ? barber.bio : 300,
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 1px 1px green",
          }}
        >
          <Box // Score
            sx={{
              direction: "ltr",
              display: "flex",
              pl: 6.5,
              mt: 3,
            }}
          >
            <Typography
              sx={{
                mt: -0.3,
                color: "green",
                fontSize: 21,
                pr: 0.8,
              }}
            >
              {barber.average_rating ? barber.average_rating : 3.5}
            </Typography>
            <Box // score icon
              sx={{
                color: "green",
              }}
            >
              <GradeIcon />
            </Box>
          </Box>

          <Typography // name
            sx={{
              display: "inline",
              pr: 5,
              fontSize: 22,
              mt: 2,
            }}
          >
            {barber.first_name + " " + barber.last_name}
          </Typography>

          {barber.salons && (
            <Box
              sx={{
                pl: 2,
                pr: 2,
                mr: 3,
                borderRadius: 2,
              }}
            >
              <Button
                onClick={() => navigate(`/salonPage/${barber.salons}`)}
                sx={{
                  justifyContent: "right",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 30,
                    width: 30,
                  }}
                  alt="icon"
                  src={BarberShopIcon}
                />

                <Typography
                  sx={{
                    mr: 1.7,
                    color: "black",
                  }}
                >
                  {salonName}
                </Typography>
              </Button>
            </Box>
          )}

          <Divider sx={{ mt: 1, pb: 1,}}/>

          <Typography // bio
            sx={{
              mt: -1,
              padding: "30px 50px",
              fontSize: 18,
            }}
          >
            {barber.bio ? barber.bio : "سلام به آرایشگاه من خوش اومدید"}
          </Typography>
          <ParentComponent barber={barber} />
        </Box>
      </Box>
    </>
  );
};

export default Information;