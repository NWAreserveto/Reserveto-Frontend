import TextField from "@mui/material/TextField";
import { useState, Fragment, useEffect } from "react";
import ResetPassword from "../API/APIendpointForgetPassword";
import style from "../styles/ForgetPassword.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const person2 = {
    email: email,
  };

  // const [open, setOpen] = useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const [success, setSuccess] = useState(false);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    if (success && responseData) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [success, responseData, navigate]);
  const forgetPasswordButton = async (event) => {
    event.preventDefault();
    try {
      const response = await ResetPassword(person2);
      // console.log(response.data);
      setResponseData(response.data);
      setSuccess(response.status === 200);
      if (response.status === 200) {
        toast.success("ایمیل برای شما ارسال خواهد شد");
      }
    } catch (error) {
      console.error(error);
      toast.error("این ایمیل وجود ندارد");
    }
    // ResetPassword(person2);
    // setOpen(true);
  };

  return (
    <body>
      <div className={style.container}>
        <ToastContainer />
        <div className={style.forgetPassword}>
          <form className={style.forgetPassForm}>
            <h1 className={style.text}>بازیابی رمز عبور</h1>
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
              label="ایمیل خود را وارد کنید"
              variant="outlined"
              className={style.email}
              value={email}
              onChange={handleEmail}
              error={emailError}
              helperText={emailError ? "ایمیل خود را وارد کuنید" : ""}
              inputProps={{
                type: "email",
              }}
            />
            <Fragment>
              <button
                className={style.forgetButton}
                onClick={forgetPasswordButton}
              >
                تایید
              </button>
              <div className={style.msgBox}></div>
            </Fragment>
          </form>
        </div>
      </div>
    </body>
  );
};

export default ForgetPassword;
