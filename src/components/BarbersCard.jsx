import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

export default function BarbersCard({ id, profilePic, name, location }) {
  const navigate = useNavigate();
  const gotoOtherPage = () => {
    navigate(`/BarberProfile/${id}`);
  };
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "20rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea style={{ flex: "1" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <img
            src={profilePic}
            alt={typeof name === "string" && name.charAt(0)}
            style={{
              clipPath: "circle()",
              objectFit: "cover",
              objectPosition: "center center",
              maxHeight: "100px",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>{name}</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: "linear-gradient(transparent 150px, white)",
          }}
        >
          <p>{location}</p>
        </div>
      </CardActionArea>
      <CardActions
        disableSpacing
        style={{ justifyContent: "space-between" }}
      >
        <Rating
          name="rating"
          defaultValue={0}
          max={5}
        />
        <Button
          variant="outlined"
          onClick={gotoOtherPage}
          sx={{ color: "var(--secondary-color)" }}
        >
          برو
        </Button>
      </CardActions>
    </Card>
  );
}
