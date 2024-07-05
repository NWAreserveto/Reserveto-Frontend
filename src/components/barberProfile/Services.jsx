import React, { useEffect, useState } from "react";
import Animation from "../Animation";
import { makeStyles } from "@material-ui/styles";
import ShaveAnimationData from "../../images/Shaving.json";
import BarberAnimationData from "../../images/Barber.json";
import SpaAnimationData from "../../images/Spa.json";
import MassageAnimationData from "../../images/Massage.json";
import NailAnimationData from "../../images/Nail.json";
import MakeupAnimationData from "../../images/Makeup.json";
import EyelashAnimationData from "../../images/Eyelash.json";
import HairWashingAnimationData from "../../images/HairWashing.json";
import GETAllServicesAPI from "../../API/APIendpointAllServices";
import { Box, CircularProgress } from "@material-ui/core";


const animations = [
  {id: 1, animationData: BarberAnimationData,  title:"اصلاح مو"},
  {id: 2, animationData: ShaveAnimationData,  title:"اصلاح صورت"},
  {id: 3, animationData: SpaAnimationData,  title:"اسپا"},
  {id: 4, animationData: MassageAnimationData,  title:"ماساژ"},
  {id: 5, animationData: NailAnimationData,  title:"ناخن"},
  {id: 6, animationData: MakeupAnimationData,  title:"آرایش"},
  {id: 7, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 8, animationData: HairWashingAnimationData,  title:"شست و شوی مو"},
  {id: 9, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 10, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 11, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 12, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 13, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 14, animationData: EyelashAnimationData,  title:"مژه"},
  {id: 15, animationData: EyelashAnimationData,  title:"مژه"},
]

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "40vh",
    width: "100%",
    margin: "0 auto",
    padding: "40px 20px",
    zIndex: -1,
  },
  imageBox: {
    position: "relative",
    height: 210,
    width: 250,
    borderRadius: 6,
    overflow: "hidden",
    zIndex: -1,
  },
  images: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    zIndex: -1,
  },
  imageItem: {
    margin: 8,
    zIndex: -1,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 6,
    transition: "transform 0.2s linear",
    zIndex: -1,
  },
  imageText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: 400,
    textTransform: "capitalize",
    zIndex: -1,
  },
}));

const Services = ({  barber }) => {
  const classes = useStyles();
  const services = animations.filter((animation) =>
    barber.services_offered.includes(animation.id)
  );

  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allServices = await GETAllServicesAPI();
        setAllServices(allServices);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    fetchData();
  }, [barber]);

  return (
    <div className={classes.container}>
      <div className={classes.images}>
      {loading && ( // loading part
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
            }}
          >
            <CircularProgress
              sx={{
                size: 60,
              }}
              color="success"
            />
          </Box>
        )}
        {!loading && services.map((service) => (
          <div key={service.id} className={classes.imageItem}>
            <div
              className={classes.imageBox}
            >
              <Animation
                animationData={service.animationData}
                title={allServices[(parseInt(service.id) - 1)].name}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 6,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;