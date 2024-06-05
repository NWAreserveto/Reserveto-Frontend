import Samples from "./Samples";
import Information from "./Information";
import Services from "./Services";
import ParentComponent from "./ParentPopup";
import { Tabs, Tab, Box } from "@mui/material";
import { useState, useEffect } from "react";

const Body = ({ barber }) => {
  const [selectedTab, setSelectedTab] = useState(0);

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

  return (
    <>
      <Box // container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box // info + tabs
          sx={{
            display: "flex",
            width: "1260px",
            mt: 12,
          }}
        >
          <Box // info
            sx={{
              width: "22%",
              position: fix ? "fixed" : "absolute",
              top: fix ? window.scrollY - 190 : null,
              // zIndex: 1000,
            }}
          >
            <Information barber={barber} />
          </Box>

          <Box // tabs
            sx={{
              mb: 20,
              mr: 48,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              style={{
                backgroundColor: "white",
                padding: "10px",
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
              <Tab
                label="رزرو"
                style={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: selectedTab === 2 ? "#668F84" : "inherit",
                }}
              />
            </Tabs>

            {selectedTab === 0 && <Samples />}
            {selectedTab === 1 && <Services />}
            {selectedTab === 2 && <ParentComponent />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Body;