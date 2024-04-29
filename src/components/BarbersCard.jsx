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

export default function BarbersCard({ id, profilePic, name, location }) {
  const navigate = useNavigate();
  const gotoProfile = () => {
    navigate("/BarberProfile");
  };
  return (
    <Card sx={{ maxWidth: 345, height: "20rem" }}>
      <CardActionArea href={"/barber" + id}>
        <CardMedia component="img" height="134" image={profilePic} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          {/* <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {typeof name === "string" && name.charAt(0)}
              </Avatar>
            }
          /> */}
          <img
            src={profilePic}
            alt={typeof name === "string" && name.charAt(0)}
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
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" sx={{ marginTop: "7rem" }}>
            <BookmarkBorderIcon />
          </IconButton>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
