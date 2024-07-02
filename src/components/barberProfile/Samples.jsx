import React from "react";
import { makeStyles } from "@material-ui/styles";
import Sample_1 from "../../images/Sample_1.jpg";
import Sample_2 from "../../images/Sample_2.jpg";
import Sample_3 from "../../images/Sample_3.jpg";
import Sample_4 from "../../images/Sample_4.jpg";
import Sample_5 from "../../images/Sample_5.jpg";
import Sample_6 from "../../images/Sample_2.jpg";
import Sample_7 from "../../images/Sample_4.jpg";
import Sample_8 from "../../images/Sample_5.jpg";

const images = [
  { name: "Bob Cut", url: Sample_1 },
  { name: "Pixie Cut", url: Sample_2 },
  { name: "Layered Cut", url: Sample_3 },
  { name: "Cornrows", url: Sample_4 },
  { name: "Long Waves", url: Sample_5 },
  { name: "Fade Cut", url: Sample_6 },
  { name: "Shaggy Cut", url: Sample_7 },
  { name: "French Braid", url: Sample_8 },
];

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    minHeight: "100vh",
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

const Samples = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.images}>
        {images.map((image) => (
          <div key={image.url} className={classes.imageItem}>
            <div
              className={classes.imageBox}
              style={{ backgroundColor: "#f0f0f0" }}
            >
              <img
                src={image.url}
                alt={image.name}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 6,
                  objectFit: "cover",
                }}
              />
              <h6 className={classes.imageText}>{image.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Samples;
