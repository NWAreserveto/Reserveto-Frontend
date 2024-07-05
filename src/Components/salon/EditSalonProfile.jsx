import { useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import checkIcon from "@mui/icons-material/Check";
import APISalonUpdate from "../../API/APIendpointSalonUpdate";
import APIDletesalon from "../../API/APIendpointDeleteSalon";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Button,
  Divider,
  Paper,
  TextField,
  MenuItem,
  Box,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Chip,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../styles/salon.module.scss";
import jsonData from "../../images/provinces_cities_counties.json";
import axios from "axios";

const textfieldstyle = {
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
  '&label.Mui-error': {
      color: 'red !important', // Error label color
    },
  "& .MuiInput-underline:after": {
    borderBottomColor: "yellow",
  },
  '& .MuiFormHelperText-root': {
    textAlign: 'right', // Align helper text to the right
    direction: 'rtl',  // Set the text direction to right-to-left
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: 'var(--secondary-color)', // Default focused label color
    },
    '&.Mui-error': {
      color: 'red !important', // Error label color
    },
    '&.Mui-error.Mui-focused': {
      color: 'red !important', // Error label color when focused
    },
  },
  "& .MuiOutlinedInput-root": {
    '&.Mui-error fieldset': {
      borderColor: 'red !important',
    },
    '&.Mui-error:hover fieldset': {
      borderColor: 'red !important', // Error border color on hover
    },
    '&.Mui-error.Mui-focused fieldset': {
      borderColor: 'red !important',
    },
    '&.Mui-error.label.Mui-focused fieldset': {
      color: 'red !important',
    },

    "& fieldset": {
      borderColor: "var(--secondary-color) !important",
    },
    "&:hover fieldset": {
      borderColor: "var(--secondary-color-lighter) !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--secondary-color) !important",
    },
  },
  "& .MuiSelect-icon": {
    right: "unset",
    left: "10px",
  },
  
  "& .MuiSelect-select": {
    paddingRight: "15px !important",
  },
};

const EditSalonProfile = ({ salon, barberId }) => {
  const [salonbarbers, setbarbers] = useState(salon.barbers);
  const [salonname, setsalonName] = useState(salon.name);
  const [phone, setphone] = useState(salon.phone_number);

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const validateName = (value) => /^[\u0600-\u06FF\s]+$/.test(value);
  const validatePhone = (value) => /^(\+98|0)?9\d{9}$/.test(value);
  const handlename = (e) => {
    const value = e.target.value;
    setsalonName(value);
    setNameError(!validateName(value));
  };
  const handlePhone = (e) => {
    const value = e.target.value;
    setphone(value);
    setPhoneError(!validatePhone(value));
  };
  const [address, setaddress] = useState(salon.address);
  const handleAddress = (e) => {
    setaddress(e.target.value);
  };

  const newData = {
    name: salonname !== salon.name ? salonname : undefined,
    phone_number: phone,
    address: address,
    barbers: salonbarbers,
    //profile_Picture: profilePicture
  };
  const edit = async () => {
    try {
      console.log("handleApplyChanges called -----------------------");
      if (
        salonname != salon.name ||
        phone != salon.phone_number ||
        address != salon.address
      ) {
        const formData = new FormData();
        //formData.append('profilePicture', profilePicture); // Append the selected file
        //formData.append('data', JSON.stringify(formData));
        await APISalonUpdate(salon.id, newData);
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };
  const navigate = useNavigate();
  const BarberId = localStorage.getItem("barberId");
  const remove = () => {
    try {
      const confirmed = window.confirm(
        "آیا از حذف این سالن تا ابد مطمئن هستید؟"
      );
      if (confirmed) {
        APIDletesalon(salon.id);
        navigate(`/Barber/Dashboard/${BarberId}`);
      }
    } catch (error) {
      console.error("failed to delete salon:", error);
    }
  };

  const [service, setService] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isModified, setIsModified] = useState(false);
  useEffect(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    setIsModified(!isEqual(newData, salon));
  }, []);

  const handleRemoveImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  return (
    <div className={style.form}>
      <Paper
        sx={{
          width: "100%",
          padding: "50px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div className={style.formHeader}>
          <h3>اطلاعات شخصی</h3>
          <Button
            sx={{
              color: "var(--secondary-color)",
              borderColor: "var(--secondary-color)",
              "&:hover": {
                bgcolor: "var(--secondary-color-lighter)",
                borderColor: "var(--secondary-color)",
              },
            }}
            type="submit"
            variant="outlined"
            onClick={edit}
            disabled={!isModified || nameError || phoneError || addressError || (salonname == salon.name &&
              phone == salon.phone_number &&
              address == salon.address)}
          >
            ویرایش اطلاعات
          </Button>
        </div>
        <Divider flexItem />
        <div className={style.formItem}>
          <TextField
            label=" نام سالن"
            name="salon_name"
            value={salonname}
            onChange={handlename}
            fullWidth
            sx={textfieldstyle}
            error={nameError}
            helperText={nameError && "نام سالن باید به صورت حروف فارسی باشد"}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="شماره تلفن"
            name="phone_number"
            value={phone}
            onChange={handlePhone}
            fullWidth
            sx={textfieldstyle}
            error={phoneError}
            helperText={phoneError && "شماره همراه نامعتبر میباشد"}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="آدرس"
            name="address"
            value={address}
            onChange={handleAddress}
            fullWidth
            sx={textfieldstyle}
          />
        </div>
        <span />
        <span />
        <Divider flexItem />
        <Button onClick={remove} variant="outlined" color="error">
          حذف کامل سالن
        </Button>
      </Paper>
    </div>
  );
};

export default EditSalonProfile;
