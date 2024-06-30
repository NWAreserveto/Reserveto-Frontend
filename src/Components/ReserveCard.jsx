import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardHeader } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ReserveCard = () => {
  const [reserve, setReserve] = useState({
    barberName: "کوشا لاهوتی",
    location: "تهران",
    reservationTime: "1403/02/01 12:30",
    services: ["اصلاح مو", "اصلاح صورت", "ارایش"],
  });

  const handleDelete = (index) => {
    const newServices = [...reserve.services]; 
    newServices.splice(index, 1);
    setReserve({ ...reserve, services: newServices });
  };

  const handleConfirmReserve = () => {
    // Confirm reserve logic
  };

  return (
    <Card
      variant="outlined"
      sx={{ width: "325px", margin: "15px" }}
    >
      <CardHeader
        sx={{ padding: "16px 0", gap: "10px", fontSize: "50px" }}
        avatar={<Avatar>{reserve.barberName[0]}</Avatar>}
        title={reserve.barberName}
        subheader={reserve.location}
      />
      <CardContent>
        <Typography
          variant="body1"
          gutterBottom
        >
          {reserve.reservationTime}
        </Typography>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            marginTop: 1,
            marginBottom: 2,
          }}
          component="ul"
        >
          {reserve.services.map((data, index) => {
            return (
              <ListItem key={index}>
                <Chip
                  sx={{
                    backgroundColor: "var(--primary-color-lighter)",
                    "& .MuiChip-deleteIcon": { margin: "0 -6px 0 5px" },
                  }}
                  label={data}
                  onDelete={() => handleDelete(index)}
                />
              </ListItem>
            );
          })}
        </Paper>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "5px",
            flexDirection: "row",
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--secondary-color)",
              "&: hover": { bgcolor: "var(--secondary-color-lighter)" },
            }}
            onClick={handleConfirmReserve}
          >
            <DeleteIcon />
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "var(--secondary-color)",
              "&: hover": { bgcolor: "var(--secondary-color-lighter)" },
            }}
            onClick={handleConfirmReserve}
          >
            تکمیل رزرو
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReserveCard;
