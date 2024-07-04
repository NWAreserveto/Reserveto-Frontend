import Samples from "./Samples";
import Information from "./Information";
import Services from "./Services";
import ParentComponent from "./ParentPopup";
import { Tabs, Tab, Box } from "@mui/material";
import { useState, useEffect } from "react";
import salonProfile from "../../API/APIendpointSalon";
import Comments from "../../components/comments/Comments";

const Body = ({ barber }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const [fix, setFix] = useState(false);

  function setFixed() {
    if (window.scrollY >= 292) setFix(true);
    else setFix(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  const [salon, setSalon] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await salonProfile(barber.salons);
        setSalon(data);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    fetchData();
  }, [barber]);

  return (
    <>
      <Box // container
        sx={{
          display: "flex",
          justifyContent: "center",
          zIndex: -1,
        }}
      >
        <Box // info + tabs + comments
          sx={{
            display: "flex",
            width: "1260px",
            mt: 12,
          }}
        >
          <Box // info
            sx={{
              width: "22%",
              display: "column",
              position: fix ? "fixed" : "absolute",
              top: fix ? window.scrollY - 200 : null,
            }}
          >
            <Information barber={barber} salonName={salon.name} />
            <ParentComponent barber={barber} />
          </Box>

          <Box // tabs + comments
            sx={{
              display: "column",
              mr: 48,
            }}
          >
            <Box // tabs
              sx={{
                boxShadow: "0px 1px 1px green",
                borderRadius: 2,
                mb: 8,
                zIndex: -1,
              }}
            >
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                sx={{
                  zIndex:-1,
                }}
                style={{
                  zIndex: -1,
                  backgroundColor: "white",
                  padding: "10px",
                  ".Mui-selected": {
                    color: "#668F8494",
                  },
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#668F84",
                  },
                }}
              >
                <Tab
                  label="نمونه کار"
                  style={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: selectedTab === 0 ? "#668F84" : "inherit",
                  }}
                />
                <Tab
                  label="خدمات"
                  style={{
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: selectedTab === 1 ? "#668F84" : "inherit",
                  }}
                />
              </Tabs>

              {selectedTab === 0 && <Samples barber={barber} />}
              {selectedTab === 1 && <Services barber={barber} />}
            </Box>

            <Comments
              barberId={barber.id}
              barberName={barber.first_name + " " + barber.last_name}
              barberPic={barber.profile_picture}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Body;