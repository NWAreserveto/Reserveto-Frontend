import React, { Component } from "react";
import moment from "moment-jalaali";
import { toPersianDigit } from "./helper";
import TimeClockAmPm from "./Time";
import TextField from "@mui/material/TextField";
import "../../styles/Calendar.scss";

moment.loadPersian();

const DayNames = () => (
  <div className="week names">
    <span className="day">ش</span>
    <span className="day">ی</span>
    <span className="day">د</span>
    <span className="day">س</span>
    <span className="day">چ</span>
    <span className="day">پ</span>
    <span className="day">ج</span>
  </div>
);

const Week = ({ date, month, select, selected }) => {
  let days = [];

  for (let i = 0; i < 7; i++) {
    const day = {
      name: date.format("jdd").substring(0, 1),
      number: date.jDate(),
      isCurrentMonth: date.jMonth() === month.jMonth(),
      isToday: date.isSame(new Date(), "day"),
      date: date,
    };

    const className =
      "day" +
      (day.isToday ? " today" : "") +
      (day.isCurrentMonth ? "" : " different-month") +
      (day.date.isSame(selected) ? " selected" : "");

    days.push(
      <span
        key={day.date.toString()}
        className={className}
        onClick={() => select(day)}
      >
        {toPersianDigit(day.number)}
      </span>
    );

    date = date.clone();
    date.add(1, "d");
  }

  return (
    <div className="week" key={days[0].toString()}>
      {days}
    </div>
  );
};

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: moment().startOf("jMonth"),
      selectedDay: null,
      selectedTime: null,
    };
  }

  previous = () => {
    let month = this.state.month;
    month.subtract(1, "month");
    this.setState({ month: month, selectedDay: null }); // Reset selected day
    // this.selectFirstDayOfMonth(month);
  };

  next = () => {
    let month = this.state.month;
    month.add(1, "month");
    this.setState({ month: month, selectedDay: null }); // Reset selected day
    // this.selectFirstDayOfMonth(month);
  };

  selectFirstDayOfMonth = (month) => {
    this.setState({
      selectedDay: month.clone().startOf("jMonth"),
    });
  };

  today = () => {
    const { onChange, onDateTimeChange } = this.props;

    this.setState({
      month: moment().startOf("jMonth"),
      selectedDay: moment().startOf("jDay"),
    });

    const dateTime = moment().format("jYYYY-jMM-jDD");
    onChange && onChange(dateTime);
    onDateTimeChange && onDateTimeChange(dateTime);
  };

  select = (day) => {
    const { onChange, onDateTimeChange } = this.props;
    let selectedDateTime = day.date.clone();

    if (this.state.selectedDay) {
      selectedDateTime.set({
        hour: this.state.selectedDay.hour(),
        minute: this.state.selectedDay.minute(),
      });
    }

    this.setState({ selectedDay: day.date });

    const dateTime = selectedDateTime.format("jYYYY-JMM-jDD HH:mm");
    onChange && onChange(dateTime);
    onDateTimeChange && onDateTimeChange(selectedDateTime);
  };

  handleTimeChange = (newTime) => {
    const { onChange, onDateTimeChange } = this.props;
    let selectedDateTime = this.state.selectedDay.clone();

    selectedDateTime.set({
      hour: newTime.hour(),
      minute: newTime.minute(),
    });

    this.setState({ selectedTime: selectedDateTime });

    const dateTime = selectedDateTime.format("jYYYY-JMM-jDD HH:mm");
    onChange && onChange(dateTime);
    onDateTimeChange && onDateTimeChange(selectedDateTime);
  };

  render() {
    return (
      <div id="calender-wrapper">
        {!this.state.selectedDay ? (
          <div id="calendar">
            <div className="header">
              <div className="icon-and-text-in-a-row" onClick={this.previous}>
                <span>&#10094;</span>
              </div>
              <span>
                {toPersianDigit(this.state.month.format("jYYYY jMMMM"))}
              </span>
              <div className="icon-and-text-in-a-row" onClick={this.next}>
                <span> &#10095;</span>
              </div>
            </div>
            <DayNames />
            <RenderWeeks
              select={this.select}
              month={this.state.month}
              selected={this.state.selectedDay}
            />
          </div>
        ) : null}
        {!this.state.selectedDay ? (
          <button onClick={this.today}>برو به امروز</button>
        ) : null}
        {this.state.selectedDay && (
          <div>
            <div>
              <TextField
                id="date-text"
                label="تاریخ"
                value={this.state.selectedDay.format("jYYYY-jMM-jDD")}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  width: "18.5rem",
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
            <div id="time-clock">
              <TimeClockAmPm
                selectedDate={this.state.selectedDay.toDate()}
                onTimeChange={this.handleTimeChange}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}

const RenderWeeks = ({ month, select, selected }) => {
  let weeks = [];
  let done = false;
  let date = month.clone().startOf("jMonth").weekday(0);

  let monthIndex = date.jMonth();

  let count = 0;

  while (!done) {
    weeks.push(
      <Week
        key={date.toString()}
        date={date.clone()}
        month={month}
        select={select}
        selected={selected}
      />
    );
    date = date.clone();
    date.add(1, "w");
    done = count++ > 2 && monthIndex !== date.jMonth();
    monthIndex = date.jMonth();
  }

  return <div className="weeks-container">{weeks}</div>;
};
