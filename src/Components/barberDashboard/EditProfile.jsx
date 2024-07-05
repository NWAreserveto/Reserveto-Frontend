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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import style from "../../styles/EditBarberProfile.module.scss";
import jsonData from "../../images/provinces_cities_counties.json";
import APIendpointAllServices from "../../API/APIendpointAllServices";
import axios from "axios";
import { format } from "util";
import { toInteger } from "lodash";

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

  const [service, setService] = useState([]);
  const [serviceNames, setServiceNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialState = {
    first_name: barber.first_name || "",
    last_name: barber.last_name || "",
    phone_number: barber.phone_number || "",
    bio: barber.bio || "",
    email: barber.user.email || "",
    services_offered: serviceNames,
    province: addr[0],
    city: addr[1],
    region: addr[2],
  };

  const [editedBarber, setEditedBarber] = useState(initialState);
  const [files, setFiles] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [startTime, setStartTime] = useState(
    barber.start_hour > 9
      ? barber.start_hour + ":00"
      : "0" + barber.start_hour + ":00"
  );
  const [endTime, setEndTime] = useState(
    barber.end_hour > 9
      ? barber.end_hour + ":00"
      : "0" + barber.end_hour + ":00"
  );
  const [startTimeError, setStartTimeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [blocktimes, setBlockTimes] = useState([]);
  const timeblocks = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
  ];

  useEffect(() => {
    const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    setIsModified(!isEqual(editedBarber, initialState));
  }, [editedBarber]);

  useEffect(() => {
    fetchServices();
    fetchGallery();
    fetchBlockTimes();
    console.log("bbbb", blocktimes);
  }, []);

  const fetchServices = async () => {
    try {
      const response = await APIendpointAllServices();
      setService(response);
      parseIdToName(response);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGallery = async () => {
    try {
      const response = await axios.get(
        `https://reserveto-back.onrender.com/api/barbers/${barber.id}/gallery/`
      );
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchBlockTimes = async () => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    try {
      const response = await axios.get(
        `https://reserveto-back.onrender.com/api/reserve/${barber.id}/day/${formattedDate}`
      );

      const block_times = response.data.blocked_times;

      block_times.forEach((item) => {
        const index = parseInt(item.start_time.split(":")[0], 10) - 8;

        if (!blocktimes.includes(timeblocks[index])) {
          const tmp = blocktimes.concat(timeblocks[index]);
          console.log("2222", blocktimes);
          console.log("3333", tmp);
          setBlockTimes(tmp);
        }
      });
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    if (name === "start_time") {
      setStartTime(value);
      if (value < "08:00") {
        setStartTimeError("زمان شروع فعالیت باید بعد از ساعت 8:00 باشد");
      } else {
        setStartTimeError("");
      }

      if (value >= endTime) {
        setEndTimeError("زمان پایان فعالیت باید بعد از زمان شروع باشد");
      } else {
        setEndTimeError("");
      }
    } else if (name === "end_time") {
      setEndTime(value);
      if (value > "17:00") {
        setEndTimeError("زمان پایان فعالیت باید قبل از ساعت 17:00 باشد");
      } else if (value <= startTime) {
        setEndTimeError("زمان پایان فعالیت باید بعد از زمان شروع باشد");
      } else {
        setEndTimeError("");
      }
    }

    setEditedBarber((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const parseIdToName = (serviceList) => {
    const names = barber.services_offered
      .map((serviceId) => {
        const serviceItem = serviceList.find((item) => item.id === serviceId);
        return serviceItem ? serviceItem.name : null;
      })
      .filter((id) => id !== null);
    setServiceNames(names);
    setEditedBarber((prevState) => ({
      ...prevState,
      services_offered: names,
    }));
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setEditedBarber((prevState) => ({
      ...prevState,
      services_offered: typeof value === "string" ? value.split(",") : value,
    }));
    console.log(editedBarber);
  };

  const handleTimeSelectChange = (event) => {
    const { value } = event.target;
    setBlockTimes(typeof value === "string" ? value.split(",") : value);
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
      if (
        key !== "province" &&
        key !== "city" &&
        key !== "region" &&
        key !== "services_offered"
      ) {
        formData.append(key, editedBarber[key]);
      }
    }
    formData.append(
      "location",
      `${editedBarber.province},${editedBarber.city},${editedBarber.region}`
    );
    const serviceIds = editedBarber.services_offered
      .map((serviceName) => {
        const serviceItem = service.find((item) => item.name === serviceName);
        return serviceItem ? serviceItem.id : null;
      })
      .filter((id) => id !== null);
    serviceIds.forEach((id) => formData.append("services_offered", id));
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

  const postBlockTime = async (id, start, end) => {
    const formData = new FormData();
    formData.append("barber", id);
    formData.append("start_time", start);
    formData.append("end_time", end);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `https://reserveto-back.onrender.com/api/blocked-times/`,
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

  const handleExtraInfoSubmit = async () => {
    const token = localStorage.getItem("token");

    const uploadFiles = async () => {
      if (files.length === 0) return;

      let formData = new FormData();
      files.forEach((file) => formData.append("images", file));

      try {
        await axios.post(
          `https://reserveto-back.onrender.com/api/barbers/${userId}/gallery/upload/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        fetchGallery();
        setFiles([]);
        setPreviews([]);
      }
    };

    const updateProfileHours = async () => {
      let formData = new FormData();
      formData.append("start_hour", startTime.split(":").at(0));
      formData.append("end_hour", endTime.split(":").at(0));

      try {
        await axios.patch(
          `https://reserveto-back.onrender.com/api/barbers/profiles/${userId}/`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating profile hours:", error);
      }
    };

    const postAllBlockTimes = async () => {
      blocktimes.forEach(async (block) => {
        const [start, end] = block.split(" - ");
        try {
          await postBlockTime(barber.id, start, end);
        } catch (error) {
          console.error("Error posting block time:", error);
        }
      });
    };

    await uploadFiles();
    await updateProfileHours();
    await postAllBlockTimes();
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
            sx={textfieldstyle}
          />
        </div>
        <div className={style.formItem}>
          <TextField
            label="بیوگرافی"
            name="bio"
            value={editedBarber.bio}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={textfieldstyle}
          />
        </div>
        <div className={style.formItem}>
          <FormControl fullWidth>
            <InputLabel
              id="services-offered-label"
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
              labelId="services-offered-label"
              id="services-offered"
              multiple
              value={editedBarber.services_offered}
              onChange={handleSelectChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="خدمات"
                  sx={textfieldstyle}
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
            >
              {service.map((serviceItem) => (
                <MenuItem
                  key={serviceItem.id}
                  value={serviceItem.name}
                >
                  {serviceItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
        <span />
        <span />
        <div className={style.formHeader}>
          <h3>اطلاعات تکمیلی</h3>
          <Button
            variant="outlined"
            onClick={handleExtraInfoSubmit}
            disabled={
              files.length === 0 &&
              (startTimeError || endTimeError) &&
              blocktimes.length === 0
            }
          >
            ویرایش اطلاعات
          </Button>
        </div>
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
              {gallery.map((pic, index) => (
                <Box
                  key={index}
                  sx={{ m: 1, position: "relative" }}
                >
                  <img
                    src={pic.image}
                    alt={`pic ${index}`}
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                </Box>
              ))}
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
        <div className={style.formItem}>
          <TextField
            label="زمان شروع فعالیت"
            name="start_time"
            type="time"
            value={startTime}
            onChange={handleTimeChange}
            error={Boolean(startTimeError)}
            sx={{
              "&": { width: "200px" },
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
            }}
          />
          <TextField
            label="زمان پایان فعالیت"
            name="end_time"
            type="time"
            value={endTime}
            onChange={handleTimeChange}
            error={Boolean(endTimeError)}
            sx={{
              "&": { width: "200px" },
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
            }}
          />
          <FormControl
            fullWidth
            sx={{ height: "56px !important" }}
          >
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
              زمان های غیرفعال
            </InputLabel>
            <Select
              multiple
              fullWidth
              value={blocktimes}
              onChange={handleTimeSelectChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="زمان های غیرفعال"
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
              {timeblocks.map((value) => (
                <MenuItem
                  key={value.id}
                  value={value}
                >
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {(startTimeError || endTimeError) && (
          <div className={style.error}>
            <div>{startTimeError}</div>
            <div>{endTimeError}</div>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default EditProfile;
