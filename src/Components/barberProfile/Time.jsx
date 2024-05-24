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
} from "@mui/material";
import moment from "moment";

const servicesData = {
  "08:00": ["کوتاهی مو", "کوتاهی ریش"],
  "09:00": ["کوتاهی مو", "کوتاهی ریش"],
  "10:00": ["کوتاهی مو", "رنگ مو"],
  "11:00": ["کوتاهی ریش", "رنگ مو"],
  "12:00": ["کوتاهی کو"],
  "13:00": ["کوتاهی ریش", "رنگ ریش"],
  "14:00": ["کوتاهی مو", "کوتاهی ریش"],
  "15:00": ["رنگ ریش", "رنگ مو"],
  "16:00": ["کوتاهی ریش", "رنگ ریش"],
};

export default function Time({ selectedDate, timesData, onTimeChange }) {
  const [open, setOpen] = useState(true);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isBarberWorking, setIsBarberWorking] = useState(true);

  const timezoneOffset = 210;

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
        const isBlocked = timesData.blocked_times.some((block) => {
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

        const isAppointed = timesData.appointment_times.some((appointment) => {
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
        });

        return {
          ...timeslot,
          isBlocked,
          isAppointed,
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

  return (
    <div style={styles.wrapper}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--primary-color)" }}
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
                            ? "#var(--primary-color)"
                            : "#var(--primary-color-lighter)",
                        "&:hover": {
                          backgroundColor:
                            time.isBlocked || time.isAppointed
                              ? "#var(--primary-color)"
                              : "#var(--primary-colorlighter)",
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
            {servicesData[selectedTime.startTime.format("HH:mm")] ? (
              servicesData[selectedTime.startTime.format("HH:mm")].map(
                (service, index) => (
                  <FormControlLabel
                    key={index}
                    control={<Checkbox name={service} />}
                    label={service}
                    sx={{
                      width: "100%",
                      marginBottom: "7px",
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#var(--primary-color)",
                      },
                    }}
                  />
                )
              )
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
                  borderBottomColor: "yellow",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "var(--secondary-color) !important",
                  },
                  "&:hover fieldset": {
                    borderColor: "var(--secondary-color) !important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "var(--secondary-color) !important",
                  },
                },
              }}
            />
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
    justifyContent: "center",
    padding: "20px",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "var(--primary-color)",
    width: "100%",
    maxWidth: "360px",
  },
  time: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};
