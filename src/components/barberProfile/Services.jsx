import React from "react";
import Animation from "../Animation";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "40vh",
    width: "100%",
    margin: "0 auto",
    padding: "40px 20px",
    xIndex: 0,
  },
  imageBox: {
    position: "relative",
    height: 210,
    width: 250,
    borderRadius: 6,
    overflow: "hidden",
    zIndex: 1,
  },
  images: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    zIndex: 1,
  },
  imageItem: {
    margin: 8,
    zIndex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 6,
    transition: "transform 0.2s linear",
    zIndex: 1,
  },
  imageText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 12,
    fontWeight: 400,
    textTransform: "capitalize",
    zIndex: 1,
  },
}));

const Services = ({ animations }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.images}>

        {animations.map((animation) => (
          <div key={animation.id} className={classes.imageItem}>
            <div
              className={classes.imageBox}
              // style={{ backgroundColor: "#f0f0f0" }}
            >
            <Animation 
              animationData={animation.animationData}
              title={animation.title}
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