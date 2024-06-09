import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea, Avatar } from "@mui/material";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { IconButton } from "@mui/material";

export default function BarbersCard({
  id,
  profilePic,
  name,
  location,
  customerId,
}) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    console.log("Customer ID:", customerId);
  }, [customerId]);

  const gotoOtherPage = () => {
    navigate(`/BarberProfile/${id}`);
  };

  const handleBookmark = async () => {
    const barber_id = id;
    const salon_id = 1;

    const url = `https://reserveto-back.onrender.com/api/customers/${customerId}/bookmarks/`;

    const data = {
      customer: customerId,
      barber: barber_id,
      salon: salon_id,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setBookmarked(true);
        console.log("Bookmark added successfully");
      } else {
        console.error("Failed to add bookmark");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
          <Avatar
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

      <CardActions disableSpacing style={{ justifyContent: "space-between" }}>
        <IconButton onClick={handleBookmark}>
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
        <Rating
          name="rating"
          defaultValue={0}
          max={5}
          sx={{ direction: "ltr" }}
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
