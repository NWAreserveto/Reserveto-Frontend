import TextField from "@mui/material/TextField";
import { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };
  return (
    <body className="contain">
      <div className="forgetPassword">
        <form className="forgetPass-form">
          <h1>بازیابی رمز عبور</h1>
          <TextField
            id="outlined-basic"
            sx={{
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
            }}
            label="ایمیل خود را وارد نمایید"
            variant="outlined"
            value={email}
            onChange={handleEmail}
          ></TextField>
        </form>
      </div>
    </body>
  );
};

export default ForgetPassword;
