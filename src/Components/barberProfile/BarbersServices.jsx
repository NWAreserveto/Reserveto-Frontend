import React, { useState } from "react";

const Services = ({ selectedTime }) => {
  const [services, setServices] = useState({
    کوتاه_کردن_مو: false,
    رنگ_مو: false,
    ماساژ: false,
  });

  const toggleService = (service) => {
    setServices((prevState) => ({
      ...prevState,
      [service]: !prevState[service],
    }));
  };

  return (
    <div style={styles.container}>
      <p style={styles.time}>سرویس ها برای {selectedTime.format("hh:mm A")}:</p>
      <ul style={styles.serviceList}>
        <li style={styles.serviceItem}>
          کوتاه کردن مو
          {services.کوتاه_کردن_مو ? (
            <button
              style={styles.subtractButton}
              onClick={() => toggleService("کوتاه_کردن_مو")}
            >
              -
            </button>
          ) : (
            <button
              style={styles.addButton}
              onClick={() => toggleService("کوتاه_کردن_مو")}
            >
              +
            </button>
          )}
        </li>
        <li style={styles.serviceItem}>
          رنگ مو
          {services.رنگ_مو ? (
            <button
              style={styles.subtractButton}
              onClick={() => toggleService("رنگ_مو")}
            >
              -
            </button>
          ) : (
            <button
              style={styles.addButton}
              onClick={() => toggleService("رنگ_مو")}
            >
              +
            </button>
          )}
        </li>
        <li style={styles.serviceItem}>
          ماساژ
          {services.ماساژ ? (
            <button
              style={styles.subtractButton}
              onClick={() => toggleService("ماساژ")}
            >
              -
            </button>
          ) : (
            <button
              style={styles.addButton}
              onClick={() => toggleService("ماساژ")}
            >
              +
            </button>
          )}
        </li>
      </ul>
      <button>افزودن</button>
    </div>
  );
};

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
    color: "black   ",
    border: "none",
    borderRadius: "20%",
    cursor: "pointer",
    padding: "5px 10px",
    fontSize: "18px",
    width: "3rem",
  },
};

export default Services;
