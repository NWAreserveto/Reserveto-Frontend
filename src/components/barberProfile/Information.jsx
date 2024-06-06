import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import Divider from '@material-ui/core/Divider';

const Information = ({ barber }) => {
  return (
    <>
      <Box //   profile picture of barber
        sx={{
          mb: "-160px",
          pr : 4,
          // pr: { xs: 9, lg: 15, xl: 32 },
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

      <Box 
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
            height: barber.bio ? barber.bio : 250,
            display: "flex",
            flexDirection: "column",
            boxShadow: '0px 1px 1px green',

          }}
          >
          <Box             // Score
            sx={{
              direction: "ltr",
              display: "flex",
              pl: 6.5,
              mt: 3,
              // pl: { xs: 10, lg: 25, xl: 40 },
            }}
          >
            <Typography
              sx={{
                mt: -0.3,
                // mt: { xs: -0.3, lg: -1 },
                color: "#212daa",
                fontSize: 22,
                // fontSize: { xs: 20, lg: 28 },
                pr: 1,
              }}
            >
              {/* 2.3 */}
              {barber.point ? barber.point : "??"}
            </Typography>
              <Box // score icon
                sx={{
                  color: "#212daa",
                }}
              >
                <GradeIcon />
              </Box>
          </Box>

          <Typography      // name
            sx={{
              display: "inline",
              pr: 5,
              fontSize: 22,
              mt: 2,
            }} >
            {barber.first_name + " " + barber.last_name}
          </Typography>

          <Divider sx={{   // line
            mt: 1, 
            pb: 1,
            // mb: ,
          }}/>

          <Typography      // bio
            sx={{
              mt: -1,
              padding: "30px 50px",
              fontSize: 18,
            }}
            >
              {barber.bio ? barber.bio : "سلام به آرایشگاه من خوش اومدید"}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Information;