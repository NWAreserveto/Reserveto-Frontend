import React, { useState, useEffect } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AlarmIcon from "@mui/icons-material/Alarm";
import {
  TextField,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import moment from "moment";
import axios from "axios";

export default function Time({ selectedDate, timesData, onTimeChange }) {
  const [open, setOpen] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isBarberWorking, setIsBarberWorking] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const timezoneOffset = 210;
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://reserveto-back.onrender.com/api/allservices/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  useEffect(() => {
    if (timesData) {
      const generateTimeslots = () => {
        const timeslots = [];
        const startHour = 8;
        const endHour = 17;

        for (let hour = startHour; hour < endHour; hour++) {
          const startTime = moment(selectedDate).hour(hour).minute(0).second(0);
          const endTime = moment(startTime).add(1, "hour");

          timeslots.push({ startTime, endTime });
        }

        return timeslots;
      };

      const timeslots = generateTimeslots();

      const filteredTimeslots = timeslots.map((timeslot) => {
        const isBlocked = timesData.blocked_times?.some((block) => {
          const blockStart = moment(selectedDate)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .add(timezoneOffset, "minutes")
            .add(moment.duration(block.start_time));
          const blockEnd = moment(selectedDate)
            .hour(0)
            .minute(0)
            .second(0)
            .millisecond(0)
            .add(timezoneOffset, "minutes")
            .add(moment.duration(block.end_time));

          return (
            timeslot.startTime.isBetween(blockStart, blockEnd, null, "[)") ||
            timeslot.endTime.isBetween(blockStart, blockEnd, null, "(]") ||
            blockStart.isBetween(
              timeslot.startTime,
              timeslot.endTime,
              null,
              "[)"
            ) ||
            blockEnd.isBetween(timeslot.startTime, timeslot.endTime, null, "(]")
          );
        });

        const appointment = timesData.appointment_times_with_service_name?.find(
          (appointment) => {
            const appointmentStart = moment(appointment.start_time).subtract(
              timezoneOffset,
              "minutes"
            );
            const appointmentEnd = moment(appointment.end_time).subtract(
              timezoneOffset,
              "minutes"
            );

            return (
              timeslot.startTime.isBetween(
                appointmentStart,
                appointmentEnd,
                null,
                "[)"
              ) ||
              timeslot.endTime.isBetween(
                appointmentStart,
                appointmentEnd,
                null,
                "(]"
              ) ||
              appointmentStart.isBetween(
                timeslot.startTime,
                timeslot.endTime,
                null,
                "[)"
              ) ||
              appointmentEnd.isBetween(
                timeslot.startTime,
                timeslot.endTime,
                null,
                "(]"
              )
            );
          }
        );

        return {
          ...timeslot,
          isBlocked,
          isAppointed: !!appointment,
          services: appointment ? appointment.services : [],
        };
      });

      setAvailableTimes(filteredTimeslots);
      setIsBarberWorking(filteredTimeslots.length > 0);
    }
  }, [timesData, selectedDate]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTimeClick = (time) => {
    if (time.isBlocked || time.isAppointed) return;

    setSelectedTime(time);
    setOpen(false);
    onTimeChange &&
      onTimeChange(
        moment(selectedDate).set({
          hour: time.startTime.hour(),
          minute: time.startTime.minute(),
          second: time.startTime.second(),
        })
      );
  };

  const handleServiceChange = (event) => {
    const serviceId = event.target.value;
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceId)
        ? prevSelected.filter((id) => id !== serviceId)
        : [...prevSelected, serviceId]
    );
  };
  const customerId = localStorage.getItem("userId");
  const barberId = localStorage.getItem("barberId");

  const handlePost = async () => {
    if (!selectedTime) return;

    const timezoneOffsetMinutes = -(3 * 60 + 30);
    const adjustedStartTime = moment(selectedDate)
      .set({
        hour: selectedTime.startTime.hour(),
        minute: selectedTime.startTime.minute(),
        second: selectedTime.startTime.second(),
      })
      .subtract(timezoneOffsetMinutes, "minutes")
      .toISOString();

    const adjustedEndTime = moment(selectedDate)
      .set({
        hour: selectedTime.endTime.hour(),
        minute: selectedTime.endTime.minute(),
        second: selectedTime.endTime.second(),
      })
      .subtract(timezoneOffsetMinutes, "minutes")
      .toISOString();

    const postData = {
      customer: customerId,
      barber: barberId,
      day: moment(selectedDate).format("YYYY-MM-DD"),
      start_time: adjustedStartTime,
      end_time: adjustedEndTime,
      services: selectedServices,
    };

    try {
      const response = await axios.post(
        "https://reserveto-back.onrender.com/api/appointments/",
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const appointmentId = response.data.id;
      localStorage.setItem("cartId", appointmentId);
      console.log("Appointment posted:", response.data);

      const cartData = {
        customer: customerId,
        appointments: [
          {
            id: appointmentId,
            customer: customerId,
            barber: barberId,
            day: moment(selectedDate).format("YYYY-MM-DD"),
            start_time: adjustedStartTime,
            end_time: adjustedEndTime,
            services: selectedServices,
          },
        ],
      };

      const cartResponse = await axios.post(
        "https://reserveto-back.onrender.com/api/cart/",
        cartData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Cart updated with the appointment:", cartResponse.status);
    } catch (error) {
      console.error("Post Error:", error);
    }
  };

  return (
    <div style={styles.wrapper}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--primary-color)" ,zIndex: 2}}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              backgroundColor: "var(--primary-color)",
              width: "100%",
              textAlign: "center",
            }}
          >
            زمان های خالی
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <AlarmIcon />
          <ListItemText primary="زمان" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {isBarberWorking ? (
              <Grid container spacing={2} sx={{ padding: 2 }}>
                {availableTimes.map((time, index) => (
                  <Grid item xs={4} key={index}>
                    <ListItemButton
                      onClick={() => handleTimeClick(time)}
                      disabled={time.isBlocked || time.isAppointed}
                      sx={{
                        textAlign: "center",
                        backgroundColor:
                          time.isBlocked || time.isAppointed
                            ? "var(--primary-color)"
                            : "var(--primary-color-lighter)",
                        "&:hover": {
                          backgroundColor:
                            time.isBlocked || time.isAppointed
                              ? "var(--primary-color)"
                              : "var(--primary-color-lighter)",
                        },
                        borderRadius: "4px",
                        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <ListItemText
                        primary={
                          time.isBlocked
                            ? "تعطیل"
                            : time.isAppointed
                            ? "پر"
                            : `${time.startTime.format(
                                "HH:mm"
                              )} - ${time.endTime.format("HH:mm")}`
                        }
                      />
                    </ListItemButton>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <ListItemText primary="امروز آرایشگر کار نمی کند" />
            )}
          </List>
        </Collapse>
      </List>
      {selectedTime &&
        isBarberWorking &&
        !selectedTime.isBlocked &&
        !selectedTime.isAppointed && (
          <div style={styles.container}>
            <Typography variant="h6" style={styles.time}>
              سرویس ها
            </Typography>
            {services.length ? (
              services.map((service) => (
                <FormControlLabel
                  key={service.id}
                  control={
                    <Checkbox
                      onChange={handleServiceChange}
                      value={service.id}
                      sx={{
                        color: "var(--secondary-color)",
                        "&.Mui-checked": {
                          color: "var(--secondary-color)",
                        },
                      }}
                    />
                  }
                  label={service.name}
                />
              ))
            ) : (
              <Typography variant="body2" sx={{ color: "#999" }}>
                هیچ سرویسی برای این تایم وجود ندارد.
              </Typography>
            )}
            <TextField
              id="selected-time"
              label="زمان انتخابی"
              value={`${selectedTime.startTime.format(
                "HH:mm"
              )} - ${selectedTime.endTime.format("HH:mm")}`}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              sx={{
                width: "100%",
                marginTop: "7px",
                marginBottom: "7px",
                "& label": {
                  transformOrigin: "right !important",
                  left: "inherit !important",
                  right: "1.75rem !important",
                  fontSize: "small",
                  color: "#807D7B",
                  fontWeight: 400,
                  overflow: "unset",
                },
                "& legend": {
                  textAlign: "right",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "10px",
                },
                "& label.Mui-focused": {
                  color: "var(--secondary-color) !important",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "var(--secondary-color) !important",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#807D7B !important",
                  },
                  "&:hover fieldset": {
                    borderColor: "#807D7B !important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--secondary-color) !important",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handlePost}
              sx={{ marginTop: "10px" }}
            >
              اضافه به سبد خرید
            </Button>
          </div>
        )}
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    paddingBottom: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
    backgroundColor: "var(--primary-color)",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    padding: "10px 15px",
    boxSizing: "border-box",
    margin: "20px 0",
  },
  time: {
    color: "#1A1D1F",
    fontSize: "small",
    width: "100%",
    textAlign: "right",
  },
};
