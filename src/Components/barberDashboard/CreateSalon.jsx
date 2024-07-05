import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  OutlinedInput,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import style from "../../styles/EditBarberProfile.module.scss";
import jsonData from "../../images/provinces_cities_counties.json";
import axios from "axios";
import EmptyList from "../../images/order-empty.svg";

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

const parseAddress = (address) => {
  if (typeof address !== "string") {
    return ["", "", ""];
  }

  const tmp = address.split(",");
  return [tmp[0] || "", tmp[1] || "", tmp[2] || ""];
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

const CreateSalon = ({ barberId, barber }) => {
  const [salon, setSalon] = useState([]);
  const [salonname, setSalonName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [phone, setPhone] = useState("");

  const [salonProfile, setSalonProfile] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [isModified, setIsModified] = useState(false);
  const [salonBarbers, setSalonBarbers] = useState([]);
  const [barberProfiles, setBarberProfiles] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleNameChange = (e) => {
    setSalonName(e.target.value);
    setIsModified(true);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setProfilePicture(selectedFile);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    setIsModified(true);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCity("");
    setRegion("");
    setIsModified(true);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    setRegion("");
    setIsModified(true);
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setIsModified(true);
  };

  const renderEmptyState = () => (
    <div className={style.emptyState}>
      <img
        src={EmptyList}
        alt="Empty list"
        className={style.emptyImage}
      />
      <Typography variant="h6">هیچ آرایشگری به سالن اضافه نشده است</Typography>
    </div>
  );

  useEffect(() => {
    const fetchBarberProfiles = async (barberIds) => {
      try {
        const profiles = await Promise.all(
          barberIds.map(async (id) => {
            const response = await axios.get(
              `https://reserveto-back.onrender.com/api/barbers/profiles/${id}/`
            );
            return response.data;
          })
        );
        setBarberProfiles(profiles);
      } catch (error) {
        console.error("Error fetching barber profiles:", error);
      }
    };

    const fetchSalon = async () => {
      try {
        const response = await axios.get(
          `https://reserveto-back.onrender.com/api/salons/3/`
        );
        const salonData = response.data;
        setSalon(salonData);
        setSalonName(salonData.name);
        const [p, c, r] = parseAddress(salonData.address);
        setProvince(p);
        setCity(c);
        setRegion(r);
        setPhone(salonData.phone_number);
        setSalonBarbers(salonData.barbers);
        setSalonProfile(salonData.profile_picture);
        fetchBarberProfiles(salonData.barbers);
      } catch (error) {
        console.error("Error fetching salon:", error);
      }
    };

    fetchSalon();
  }, []);

  const handleRemoveBarber = async (barberId) => {
    try {
      await axios.put(`/api/remove_barber/${barberId}`, {
        salon_id: barber.salon,
      });
      setSalonBarbers(salonBarbers.filter((id) => id !== barberId));
      setBarberProfiles(
        barberProfiles.filter((profile) => profile.id !== barberId)
      );
    } catch (error) {
      console.error("Error removing barber:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", salonname);
      formData.append("phone_number", phone);
      formData.append("address", `${province},${city},${region}`);
      formData.append("profile_picture", profilePicture);
      const token = localStorage.getItem("token");
      const api = axios.create({
        baseURL: "https://reserveto-back.onrender.com/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      await api.post("/api/salons/", formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", salonname);
      formData.append("phone_number", phone);
      formData.append("address", `${province},${city},${region}`);
      formData.append("profile_picture", profilePicture);
      const token = localStorage.getItem("token");
      const api = axios.create({
        baseURL: "https://reserveto-back.onrender.com/",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      await api.patch("/api/salons/3/", formData);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
          {barber.salons ? (
            <Button
              type="submit"
              variant="outlined"
              onClick={handleEdit}
              disabled={!isModified}
            >
              ویرایش اطلاعات
            </Button>
          ) : (
            <Button
              type="submit"
              variant="outlined"
              onClick={handleSubmit}
            >
              ایجاد سالن
            </Button>
          )}
        </div>
        <Divider flexItem />
        <div className={style.formProfile}>
          <div className={style.avatarContainer}>
            <Avatar
              src={profilePicture}
              sx={{
                width: "150px",
                height: "150px",
                bgcolor: "var(--secondary-color)",
              }}
            />

            <label htmlFor="file-upload2">
              <input
                id="file-upload2"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={style.fileInput}
              />
              <IconButton
                variant="contained"
                color="primary"
                component="span"
                className={style.uploadButton}
              >
                <EditIcon />
              </IconButton>
            </label>
          </div>
          <div className={style.user}>
            <TextField
              label=" نام سالن"
              name="first_name"
              value={salonname}
              onChange={handleNameChange}
              fullWidth
              sx={textfieldstyle}
            />
            <TextField
              label="شماره تلفن"
              name="phone_number"
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              sx={textfieldstyle}
            />
          </div>
        </div>

        <div className={style.formItem}>
          <TextField
            label="استان"
            name="province"
            value={province}
            onChange={handleProvinceChange}
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
            value={city}
            onChange={handleCityChange}
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
            disabled={!province}
          >
            {province &&
              provinces[province] &&
              provinces[province].map((city) => (
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
            value={region}
            onChange={handleRegionChange}
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
            disabled={!city}
          >
            {city &&
              cities[city] &&
              cities[city].map((region) => (
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
        <span />
        <div className={style.barbersSection}>
          <div
            className={style.formHeader}
            style={{ marginBottom: "20px" }}
          >
            <h3> آرایشگران سالن</h3>
            {salonBarbers.length !== 0 && (
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
          </div>
          <span />
          <span />
          <Divider flexItem />
          <Box>
            {barberProfiles.length === 0
              ? renderEmptyState()
              : barberProfiles.map((profile) => (
                  <Chip
                    key={profile.id}
                    label={profile.Full_Name}
                    variant="outlined"
                    sx={{ margin: "5px" }}
                  />
                ))}
          </Box>
          <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ marginTop: "10px" }}>
              {barberProfiles.map((profile) => (
                <ListItem
                  key={profile.id}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={profile.Full_Name}
                      src={profile.profile_picture}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={profile.Full_Name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {profile.bio}
                        </Typography>
                        {` — ${profile.phone_number}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </Box>
          </Collapse>
        </div>

        <span />
        <span />
      </Paper>
    </div>
  );
};

export default CreateSalon;
