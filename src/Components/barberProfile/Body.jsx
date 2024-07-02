import Samples from "./Samples";
import Information from "./Information";
import Services from "./Services";
import ParentComponent from "./ParentPopup";
import { Tabs, Tab, Box } from "@mui/material";
import { useState, useEffect } from "react";
import GETBarberGalleryAPI from "../../API/APIendpointBarberGallery";
import ShaveAnimationData from "../../images/Shaving.json";
import BarberAnimationData from "../../images/Barber.json";
import SpaAnimationData from "../../images/Spa.json";
import MassageAnimationData from "../../images/Massage.json";
import NailAnimationData from "../../images/Nail.json";
import MakeupAnimationData from "../../images/Makeup.json";
import EyelashAnimationData from "../../images/Eyelash.json";
import HairWashingAnimationData from "../../images/HairWashing.json";
import salonProfile from "../../API/APIendpointSalon";

const animations = [
  {id: 1, animationData: ShaveAnimationData,  title:"اصلاح صورت"},
  {id: 2, animationData: BarberAnimationData,  title:"اصلاح مو"},
  {id: 3, animationData: SpaAnimationData,  title:"اسپا"},
  {id: 4, animationData: MassageAnimationData,  title:"ماساژ"},
  {id: 5, animationData: NailAnimationData,  title:"ناخن"},
  {id: 6, animationData: MakeupAnimationData,  title:"آرایش"},
  {id: 7, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 8, animationData: HairWashingAnimationData,  title:"شست وشو مو"}
]


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

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GETBarberGalleryAPI(barber.id);
        setImages(data);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    fetchData();
  }, [barber]);

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
      {/* <ParentComponent /> */}
      <Box // container
        sx={{
          // backgroundColor: 'red',
          // mt: -15,
          display: "flex",
          justifyContent: "center",
        }}
      >

        
        <Box // info + tabs
          sx={{
            display: "flex",
            width: "1260px",
            mt: 12,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: '22%',
              position: fix ? 'fixed' : 'absolute',
              top: fix ? window.scrollY - 200 : null,
            }}
          >
            <Information barber={barber} salonName={salon.name} />
            <ParentComponent />
          </Box>

          <Box // tabs
            sx={{
              mb: 20,
              mr: 48,
              zIndex: 1,
              boxShadow: '0px 1px 1px green',
              borderRadius: 2,
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              style={{
                backgroundColor: "white",
                padding: "10px",
                zIndex: 1,
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

            {selectedTab === 0 && <Samples images={images} />}
            {selectedTab === 1 && <Services animations={animations} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Body;