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
import APIsalonCreate from "../API/APIendpointCreateSalon";
import style from "../styles/EditBarberProfile.module.scss";
import jsonData from "../images/provinces_cities_counties.json";
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
  "& .MuiSelect-icon": {
    right: "unset",
    left: "10px",
  },
  "& .MuiSelect-select": {
    paddingRight: "15px !important",
  },
};

const Createsalon = ({barberId}) => {
    const [salonbarbers,setbarbers] = useState();
    const [salonname, setsalonName] = useState();
    const handlename = (e) => {
      setsalonName(e.target.value);
    }
    const [phone, setphone] = useState();
    const handlePhone = (e) => {
      setphone(e.target.value);
    }
    const [address, setaddress] = useState();
    const handleAddress = (e) => {
      setaddress(e.target.value);
    }
    useEffect(() => {
      setbarbers([barberId]);
    }, [barberId]);
    const newData = {
      name : salonname,
      phone_number : phone,
      address : address,
      barbers : salonbarbers,
      //profile_Picture: profilePicture
    };
    const edit = () =>{
      try {
        console.log('handleApplyChanges called -----------------------');
        const formData = new FormData();
        //formData.append('profilePicture', profilePicture); // Append the selected file
        //formData.append('data', JSON.stringify(formData));
        APIsalonCreate(newData);
      } catch (error) {
        console.error('Failed to update profile:', error);
    }
    }


  const [service, setService] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isModified, setIsModified] = useState(false);
  useEffect(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    setIsModified(!isEqual(newData, ""));
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
          <h3>اطلاعات سالن</h3>
          <Button
            type="submit"
            variant="outlined"
            onClick={edit}
            disabled={!isModified}
          >
            ایجاد سالن
          </Button>
        </div>
        <Divider flexItem />
        <div className={style.formItem}>
          <TextField
            label=" نام سالن"
            name="first_name"
            onChange={handlename}
            fullWidth
            sx={textfieldstyle}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="شماره تلفن"
            name="phone_number"
            onChange={handlePhone}
            fullWidth
            sx={textfieldstyle}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="آدرس"
            name="address"
            onChange={handleAddress}
            fullWidth
            sx={textfieldstyle}
          />
        </div>
        <span />
        <span />
        <Divider flexItem />
      </Paper>
    </div>
  );
};

export default Createsalon;