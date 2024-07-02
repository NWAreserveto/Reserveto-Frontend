import { useState, useEffect } from "react";
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
import moment from "moment";
import GETBarberProfileAPI from "../API/APIendpointBarberProfile";
import axios from "axios";
import * as mom from "jalali-moment";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ReserveCard = () => {
  const token = localStorage.getItem("token");
  const [reservations, setReservations] = useState([]);
  const [barbers, setBarbers] = useState({});
  const [services, setServices] = useState({});

  const customerIdFromUrl = window.location.href.split("/").pop();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(
          "https://reserveto-back.onrender.com/api/cart/list/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const customerReservations = response.data.filter(
          (reservation) => reservation.customer.toString() === customerIdFromUrl
        );

        setReservations(customerReservations);

        const barberIds = [
          ...new Set(
            customerReservations.flatMap((reservation) =>
              reservation.appointments.map((appointment) => appointment.barber)
            )
          ),
        ];

        const barberPromises = barberIds.map((id) => GETBarberProfileAPI(id));
        const barberDetails = await Promise.all(barberPromises);

        const barberData = barberDetails.reduce((acc, barber) => {
          if (barber && barber.id) {
            acc[barber.id] = barber;
          }
          return acc;
        }, {});
        setBarbers(barberData);

        const serviceResponse = await axios.get(
          "https://reserveto-back.onrender.com/api/allservices/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const serviceData = serviceResponse.data.reduce((acc, service) => {
          acc[service.id] = service.name;
          return acc;
        }, {});

        setServices(serviceData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservations();
  }, [token, customerIdFromUrl]);

  const handleDeleteAppointment = (reservationId) => {
    setReservations(
      reservations.filter((reservation) => reservation.id !== reservationId)
    );
  };

  const handleConfirmReserve = (reservationId) => {
    axios
      .post(
        `https://reserveto-back.onrender.com/api/cart/${reservationId}/confirm/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Reservation confirmed:", response.data);
        setReservations(reservations.filter((r) => r.id !== reservationId));
      })
      .catch((error) => {
        console.error("Error confirming reservation:", error);
      });
  };

  if (reservations.length === 0) {
    return <Typography variant="h6">رزروی موجود نیست</Typography>;
  }

  return (
    <>
      {reservations
        .filter(
          (reservation) =>
            reservation.appointments.length > 0 &&
            barbers[reservation.appointments[0]?.barber]
        )
        .map((reservation) => (
          <Card
            key={reservation.id}
            variant="outlined"
            sx={{ width: "325px", margin: "15px" }}
          >
            {reservation.appointments.length > 0 && (
              <CardHeader
                sx={{ padding: "16px 0", gap: "10px", fontSize: "50px" }}
                avatar={
                  <Avatar>
                    {barbers[reservation.appointments[0]?.barber]
                      ?.first_name?.[0] || "?"}
                  </Avatar>
                }
                title={`${
                  barbers[reservation.appointments[0]?.barber]?.first_name ||
                  "No"
                } ${
                  barbers[reservation.appointments[0]?.barber]?.last_name ||
                  "Barber Name"
                }`}
              />
            )}
            <CardContent>
              <Typography variant="body1" gutterBottom>
                {`${
                  mom(reservation.appointments[0]?.day)
                    .locale("fa")
                    .format("YYYY/M/D") || "No Date"
                } - ${
                  moment(reservation.appointments[0]?.start_time).format(
                    "HH:mm"
                  ) || "No Time"
                }`}
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
                {(reservation.appointments[0]?.services || []).map(
                  (serviceId, serviceIndex) => (
                    <ListItem key={serviceIndex}>
                      <Chip
                        sx={{
                          backgroundColor: "var(--primary-color-lighter)",
                          "& .MuiChip-deleteIcon": { margin: "0 -6px 0 5px" },
                        }}
                        label={services[serviceId] || "Unknown Service"}
                      />
                    </ListItem>
                  )
                )}
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
                  onClick={() => handleDeleteAppointment(reservation.id)}
                >
                  <DeleteIcon />
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "var(--secondary-color)",
                    "&: hover": { bgcolor: "var(--secondary-color-lighter)" },
                  }}
                  onClick={() => handleConfirmReserve(reservation.id)}
                >
                  تکمیل رزرو
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default ReserveCard;
