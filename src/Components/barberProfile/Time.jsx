import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AlarmIcon from "@mui/icons-material/Alarm";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function Time() {
  const [open, setOpen] = useState(true);
  const [selectedTime, setSelectedTime] = useState("");
  const [timeServices, setTimeServices] = useState({
    "16:00": {
      کوتاهی_مو: false,
      رنگ_مو: false,
      ماساژ: false,
    },
    "17:30": {
      کوتاه_کردن_مو: false,
      رنگ_مو: false,
      ماساژ: false,
    },
    "19:20": {
      کوتاه_کردن_مو: false,
      رنگ_مو: false,
      سلام: false,
    },
  });

  const toggleService = (time, service) => {
    setTimeServices((prevState) => ({
      ...prevState,
      [time]: {
        ...prevState[time],
        [service]: !prevState[time][service],
      },
    }));
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setOpen(false);
  };

  const handleNextClick = () => {
    setSelectedTime("");
  };

  return (
    <div>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "var(--primary-color)" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ backgroundColor: "var(--primary-color)", width: "100%" }}
          >
            زمان های خالی
          </ListSubheader>
        }
      >
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <AlarmIcon />
          </ListItemIcon>
          <ListItemText primary="زمان" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {["16:00", "17:30", "19:20"].map((time) => (
              <ListItemButton
                key={time}
                sx={{ pl: 4 }}
                onClick={() => handleTimeClick(time)}
              >
                <ListItemText primary={time} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      {selectedTime && (
        <div style={styles.container}>
          <p style={styles.time}>سرویس ها</p>
          <TextField
            id="selected-time"
            label="زمان انتخابی"
            value={selectedTime}
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
          <ul style={styles.serviceList}>
            {Object.keys(timeServices[selectedTime]).map((service) => (
              <li style={styles.serviceItem} key={service}>
                {service}
                {timeServices[selectedTime][service] ? (
                  <button
                    style={styles.subtractButton}
                    onClick={() => toggleService(selectedTime, service)}
                  >
                    -
                  </button>
                ) : (
                  <button
                    style={styles.addButton}
                    onClick={() => toggleService(selectedTime, service)}
                  >
                    +
                  </button>
                )}
              </li>
            ))}
          </ul>
          <button onClick={handleNextClick}>افزودن</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  time: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  serviceList: {
    listStyleType: "none",
    padding: 0,
  },
  serviceItem: {
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "var(--secondary-color)",
    color: "black",
    border: "none",
    borderRadius: "20%",
    cursor: "pointer",
    padding: "5px 10px",
    fontSize: "18px",
    width: "3rem",
  },
  subtractButton: {
    backgroundColor: "#dc3545",
    color: "black",
    border: "none",
    borderRadius: "20%",
    cursor: "pointer",
    padding: "5px 10px",
    fontSize: "18px",
    width: "3rem",
  },
};
