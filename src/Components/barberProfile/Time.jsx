import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";
import TextField from "@mui/material/TextField";
import Services from "./BarbersServices";

export default function TimeClockAmPm() {
  const [selectedTime, setSelectedTime] = React.useState(null);

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {selectedTime ? <Services selectedTime={selectedTime} /> : null}
      {!selectedTime && (
        <React.Fragment>
          <TimeClock
            value={selectedTime}
            onChange={handleTimeChange}
            ampm={false}
            sx={{
              "& .MuiClock-pointer": {
                backgroundColor: "red",
              },
            }}
          />
          <TextField
            id="time-text"
            label="زمان"
            value={selectedTime ? selectedTime.format("hh:mm A") : ""}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              width: "18.5rem",
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
        </React.Fragment>
      )}
    </LocalizationProvider>
  );
}