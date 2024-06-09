import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import APISalonUpdate from "../../API/APIendpointSalonUpdate";

export default function SalonBarbersCard({
  barberIDs,
  salonid,
  id,
  profilePic,
  name,
  location,
  customerId,
}) {
    const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    console.log("Customer ID:", customerId);
  }, [customerId]);

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
  const [barberIds, setBarberIds] = useState(barberIDs);
  const navigate = useNavigate();
  const gotoOtherPage = () => {
    navigate(`/BarberProfile/${id}`);
  };
  const removeBarberID = () => {
    const confirmed = window.confirm("آیا از حذف این آرایشگر مطمئن هستید؟");
    if (confirmed) {
      console.log("salonid is :" + salonid);
      console.log("removed id is : " + id);
      setBarberIds((prevIDs) => {
        const updatedIds = prevIDs.filter((barberID) => barberID != id);
        Updatesalon(updatedIds);
        console.log(updatedIds);
      });
    }
  };
  const Updatesalon = async (updatedIds) => {
    try {
      const newdata = {
        barbers: updatedIds,
      };
      console.log("hasalonndleApplyChanges called -----------------------");
      await APISalonUpdate(salonid, newdata);
    } catch (error) {
      console.error(error);
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
      
      <CardActionArea style={{ flex: "1" }} onClick={gotoOtherPage}>
      <CardMedia sx={{ height: 210 }} image={profilePic} title="green iguana" />
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
        <Rating name="rating" defaultValue={0} max={5} sx={{ direction: "ltr" }} />
        <label htmlFor="">
            <IconButton onClick={handleBookmark}>
            {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </IconButton>
        </label>
      </CardActions>
    </Card>
  );
}
