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
import style from "../../styles/EditBarberProfile.module.scss";
import jsonData from "../../images/provinces_cities_counties.json";
import axios from "axios";

const names = [
  "اصلاح مو",
  "اصلاح صورت",
  "رنگ مو",
  "شست و شو مو",
  "کاشت ناخن",
  "استایل",
];

const extractData = (data) => {
  const provinces = {};
  const cities = {};
  const regions = {};

  data.forEach((item) => {
    const { provinceName, countyName, cityName } = item;

    if (!provinces[provinceName]) {
      provinces[provinceName] = [];
    }
    if (!provinces[provinceName].includes(cityName)) {
      provinces[provinceName].push(cityName);
    }

    if (!cities[cityName]) {
      cities[cityName] = [];
    }
    if (!cities[cityName].includes(countyName)) {
      cities[cityName].push(countyName);
    }

    if (!regions[countyName]) {
      regions[countyName] = [];
    }
    if (!regions[countyName].includes(cityName)) {
      regions[countyName].push(cityName);
    }
  });

  return { provinces, cities, regions };
};

const { provinces, cities, regions } = extractData(jsonData);

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

const EditProfile = ({ barber }) => {
  const userIdList = window.location.href.split("/");
  const userId = userIdList[userIdList.length - 1];
  const parseAddress = (address) => {
    if (typeof address !== "string") {
      return ["", "", ""];
    }

    const tmp = address.split(",");
    return [tmp[0] || "", tmp[1] || "", tmp[2] || ""];
  };

  const addr = parseAddress(barber.location);

  const initialState = {
    first_name: barber.first_name || "",
    last_name: barber.last_name || "",
    phone_number: barber.phone_number || "",
    bio: barber.bio || "",
    email: barber.user.email || "",
    province: addr[0],
    city: addr[1],
    region: addr[2],
  };

  const [editedBarber, setEditedBarber] = useState(initialState);
  const [service, setService] = useState([]);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    setIsModified(!isEqual(editedBarber, initialState));
  }, [editedBarber]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(typeof value === "string" ? value.split(",") : value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBarber((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "province" ? { city: "", region: "" } : {}),
      ...(name === "city" ? { region: "" } : {}),
    }));
  };

  const handleFileChange = (event) => {
    const selectedFiles = files.concat(Array.from(event.target.files));
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleRemoveImage = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in editedBarber) {
      if (key !== "province" || key !== "city" || key !== "region") {
        formData.append(key, editedBarber[key]);
      }
      formData.append(
        "address",
        editedBarber.provinces +
          "," +
          editedBarber.city +
          "," +
          editedBarber.region
      );
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.patch(
        `https://reserveto-back.onrender.com/api/barbers/profiles/${userId}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
            variant="outlined"
            onClick={handleSubmit}
            disabled={!isModified}
          >
            ویرایش اطلاعات
          </Button>
        </div>
        <Divider flexItem />
        <div className={style.formItem}>
          <TextField
            label="نام"
            name="first_name"
            value={editedBarber.first_name}
            onChange={handleChange}
            fullWidth
            sx={textfieldstyle}
          />
          <TextField
            label="نام خانوادگی"
            name="last_name"
            value={editedBarber.last_name}
            onChange={handleChange}
            fullWidth
            sx={textfieldstyle}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="شماره تلفن"
            name="phone_number"
            value={editedBarber.phone_number}
            onChange={handleChange}
            fullWidth
            sx={textfieldstyle}
          />
          <TextField
            label="ایمیل"
            name="email"
            value={editedBarber.email}
            onChange={handleChange}
            fullWidth
            disabled
            sx={textfieldstyle}
          />
        </div>
        <TextField
          label="بیوگرافی"
          name="bio"
          value={editedBarber.bio}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          sx={textfieldstyle}
        />
        <div className={style.formItem}>
          <TextField
            label="استان"
            name="province"
            value={editedBarber.province}
            onChange={handleChange}
            select
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              },
            }}
            sx={textfieldstyle}
          >
            {provinces &&
              Object.keys(provinces).map((province) => (
                <MenuItem
                  key={province}
                  value={province}
                >
                  {province}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            label="شهر"
            name="city"
            value={editedBarber.city}
            onChange={handleChange}
            select
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              },
            }}
            sx={textfieldstyle}
            disabled={!editedBarber.province}
          >
            {editedBarber.province &&
              provinces[editedBarber.province] &&
              provinces[editedBarber.province].map((city) => (
                <MenuItem
                  key={city}
                  value={city}
                >
                  {city}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            label="منطقه"
            name="region"
            value={editedBarber.region}
            onChange={handleChange}
            select
            fullWidth
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              },
            }}
            sx={textfieldstyle}
            disabled={!editedBarber.city}
          >
            {editedBarber.city &&
              cities[editedBarber.city] &&
              cities[editedBarber.city].map((region) => (
                <MenuItem
                  key={region}
                  value={region}
                >
                  {region}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className={style.formItem}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel
              id="multiple-chip-label"
              sx={{
                transformOrigin: "right !important",
                left: "inherit !important",
                right: "1.75rem !important",
                fontSize: "small",
                color: "#807D7B",
                fontWeight: 400,
              }}
            >
              خدمات
            </InputLabel>
            <Select
              multiple
              fullWidth
              value={service}
              onChange={handleSelectChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="خدمات"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                    />
                  ))}
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              sx={textfieldstyle}
            >
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <span />
        <span />
        <h3>اطلاعات تکمیلی</h3>
        <Divider flexItem />
        <Stack
          border="1px solid var(--secondary-color)"
          padding="16.5px 14px"
          borderRadius="5px"
          minHeight="150px"
          justifyContent="space-between"
        >
          <Box>
            <h6 style={{ color: "#807D7B" }}>نمونه کار</h6>

            <Box sx={{ display: "flex", flexWrap: "wrap", mb: 2, mt: 2 }}>
              {previews.map((preview, index) => (
                <Box
                  key={index}
                  sx={{ m: 1, position: "relative" }}
                >
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                  <IconButton
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      minWidth: "unset",
                      width: 20,
                      height: 20,
                    }}
                  >
                    <CloseIcon sx={{ width: 16, height: 16 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
          <label htmlFor="sample-upload">
            <input
              id="sample-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{
                display: "none",
                position: "absolute",
                bottom: "0",
                left: "0",
              }}
            />
            <Button
              variant="outlined"
              component="span"
            >
              افزودن تصویر
            </Button>
          </label>
        </Stack>
      </Paper>
    </div>
  );
};

export default EditProfile;
