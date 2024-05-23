import React, { useState } from "react";
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
import { styled } from "@material-ui/core";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
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

const EditProfile = (barber) => {
  const parseAddress = (address) => {
    if (typeof address !== "string") {
      return ["", "", ""];
    }

    const tmp = address.split(",");
    if (tmp.length === 0) {
      return ["", "", ""];
    } else if (tmp.length === 1) {
      return [tmp[0], "", ""];
    } else if (tmp.length === 2) {
      return [tmp[0], tmp[1], ""];
    } else {
      return [tmp[0], tmp[1], tmp[2]];
    }
  };

  const addr = parseAddress(barber.barber.location);

  const [editedBarber, setEditedBarber] = useState({
    first_name: barber.barber.first_name,
    last_name: barber.barber.last_name,
    phone_number: barber.barber.phone_number,
    bio: barber.barber.bio,
    province: addr[0],
    city: addr[1],
    region: addr[2],
  });

  const [service, setService] = useState([]);

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setService(typeof value === "string" ? value.split(",") : value);
  };

  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

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
        <div className={style.formItem}>
          <h3>اطلاعات شخصی</h3>
          <Button variant="outlined">ویرایش اطلاعات</Button>
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
            {Object.keys(provinces).map((province) => (
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
          <label htmlFor="file-upload">
            <input
              id="file-upload"
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
