import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function BarbersCard({ image, name, location }) {
  return (
    <Card sx={{ maxWidth: 345, height: "20rem" }}>
      <CardMedia
        component={image}
        height="134"
        image={image}
        // alt="Paella dish"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          // marginBottom: "5.5rem",
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {typeof name === "string" && name.charAt(0)}
            </Avatar>
          }
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
    </Card>
  );
}
