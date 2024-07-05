import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Box, CircularProgress } from "@material-ui/core";
import GETBarberGalleryAPI from "../../API/APIendpointBarberGallery";

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

const Samples = ({ barber }) => {

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GETBarberGalleryAPI(barber.id);
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching images:", error);
      }
    };
    fetchData();
  }, [barber]);

  const classes = useStyles();

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
        {!loading && Array.isArray(images) && images.map((pic) => (
          <div key={pic.id} className={classes.imageItem}>
            <div
              className={classes.imageBox}
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <Avatar
                src={pic.image}
                alt=""
                sx={{
                  zIndex: -1,
                }}
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

export default Samples;
