import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const reserve = {
  barberName: "کوشا لاهوتی",
  location: "تهران",
  reservationTime: "dvd",
  services: ["اصلاح مو", "اصلاح صورت"],
};

const ReserveCard = () => {
  const handleRemoveService = (index) => {
    // Remove service logic
  };

  const handleConfirmReserve = () => {
    // Confirm reserve logic
  };

  return (
    <Card sx={{ width: "300px" }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          {reserve.barberName}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
        >
          Location: {reserve.location}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          gutterBottom
        >
          Reservation Time: {reserve.reservationTime}
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
        >
          Services:
        </Typography>
        <ul>
          {reserve.services.map((service, index) => (
            <li key={index}>
              {service}
              <IconButton
                onClick={() => handleRemoveService(index)}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </li>
          ))}
        </ul>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmReserve}
        >
          Confirm Reserve
        </Button>
      </CardContent>
    </Card>
  );
};

export default ReserveCard;
