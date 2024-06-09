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
}) {
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
      <CardMedia sx={{ height: 210 }} image={profilePic} title="green iguana" />
      <CardActionArea onClick={gotoOtherPage} style={{ flex: "1" }}>
        {/* <div
          style={{
            //backgroundImage: `url(${profilePic})`,
            backgroundSize: 'cover',
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <img
            src={profilePic}
            alt={typeof name === "string" && name.charAt(0)}
            style={{
              height: '100%',
              width: '100%',
              clipPath: "circle()",
              objectFit: "cover",
              //marginTop: '-48px',
              objectPosition: "center center",
              maxHeight: "250px",
            }}
          />
        </div> */}
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
      <CardActions sx={{opacity:'0.8'}} disableSpacing style={{ justifyContent: "space-between" }}>
        <Rating name="rating" defaultValue={0} max={5} sx={{ direction: "ltr" }} />
        <Button
          variant="outlined"
          onClick={removeBarberID}
          color="error"
          sx={{ m: 0 }}
        >
          حذف
        </Button>
      </CardActions>
    </Card>
  );
}
