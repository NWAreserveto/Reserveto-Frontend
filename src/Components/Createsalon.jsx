// import React from 'react';
// import { useState } from 'react';
// import { useRef } from 'react';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddPhotoIcon from '@mui/icons-material/AddAPhoto';
// import checkIcon from '@mui/icons-material/Check';
// import IconButton from '@mui/material/IconButton';
// import MenuItem from '@mui/material/MenuItem';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import style from '../styles/EditProfile.module.scss';
// import APIsalonCreate from "../API/APIendpointCreateSalon";

// // const user = {
// //   firstname: 'پرهام',
// //   lastname: 'هدایتی',
// //   username: 'phd',
// //   email: 'johndoe@example.com',
// //   location:'تهران ، نیاوران',
// //   followers: 100,
// //   following: 50,
// //   posts: 20
// // };


// const currencies = [
//     {
//       value: 'ML',
//       label: 'مردانه',
//     },
//     {
//       value: 'FML',
//       label: 'زنانه',
//     },
//   ];

//  const CreateSalon = ({barberId}) => {
//   const [profilePicture, setProfilePicture] = useState(null);
//   const fileInputRef = useRef();
//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     setProfilePicture(file);
//   };
//     const [salonname, setsalonName] = useState([]);
//     const handlename = (e) => {
//       setsalonName(e.target.value);
//     }
//     const [phone, setphone] = useState([]);
//     const handlePhone = (e) => {
//       setphone(e.target.value);
//     }
//     const [address, setaddress] = useState([]);
//     const handleAddress = (e) => {
//       setaddress(e.target.value);
//     }
//     const salonbarbers = [barberId];
//     const newData = {
//       name : salonname,
//       phone_number : phone,
//       address : address,
//       barbers : salonbarbers,
//       profile_Picture: profilePicture
//     };
//     const edit = () =>{
//       try {
//         console.log('handleApplyChanges called -----------------------');
//         const formData = new FormData();
//         formData.append('profilePicture', profilePicture); // Append the selected file
//         formData.append('data', JSON.stringify(formData));
//         console.log(newData);
//         APIsalonCreate(newData);
//       } catch (error) {
//         console.error('Failed to update profile:', error);
//     }
//     }
//     // const handleChange = (event) => {
//     //     setName(event.target.value);}
//     return (
//         <div className={style.EditContainer}>
//             <Box 
//                 component="form"
//                 sx={{
//                   mb : 2,
//                   bgcolor : 'var(--primary-color)',
//                   border: '2px solid',
//                   borderColor: "var(--secondary-color)",
//                   //bgcolor : 'white',
//                   height: {xs: 40, sm: 50, md: 60, lg: 600},
//                   width: {xs: 400, sm: 450, md:500, lg: 900},
//                     '& .MuiTextField-root': { m: 1 },
//                   }}
//                 noValidate
//                 autoComplete="off"
//                 //onSubmit={(e) => { e.preventDefault(); }}
//             >
//                 <div style={{margin : '25px'}}>
//                 <div className={style.changebutt}>
//                 <Stack direction="row" spacing={2} gap={1}>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     ref={fileInputRef}
//                     onChange={handleFileSelect}
//                   />
//                 <IconButton aria-label="add" size="large" onClick={() => fileInputRef.current.click()} >
//                   <AddPhotoIcon />
//                 </IconButton>
//                 </Stack>
//                 </div>
//                 <TextField
//               id="outlined-basic"
//               label="نام سالن"
//               variant="outlined"
//               fullWidth
//               required
//               type="text"
//               sx={{
//                 "& label": {
//                   transformOrigin: "right !important",
//                   left: "inherit !important",
//                   right: "1.75rem !important",
//                   fontSize: "small",
//                   color: "#807D7B",
//                   fontWeight: 400,
//                   overflow: "unset",
//                 },
//                 "& legend": {
//                   textAlign: "right",
//                   display: "flex",
//                   justifyContent: "center",
//                   fontSize: "10px",
//                 },
//                 "& label.Mui-focused": {
//                   color: "var(--secondary-color) !important",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "yellow",
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                 },
//               }}
//               //className={style.username}
//               //value={salonname}
//               onChange={handlename}
//               //error={barberNameError}
//               //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
//               inputProps={{
//                 pattern: "[A-Za-z ]+",
//               }}
//             />
//                 <TextField
//               id="outlined-basic"
//               label="شماره "
//               variant="outlined"
//               fullWidth
//               required
//               type="text"
//               sx={{
//                 "& label": {
//                   transformOrigin: "right !important",
//                   left: "inherit !important",
//                   right: "1.75rem !important",
//                   fontSize: "small",
//                   color: "#807D7B",
//                   fontWeight: 400,
//                   overflow: "unset",
//                 },
//                 "& legend": {
//                   textAlign: "right",
//                   display: "flex",
//                   justifyContent: "center",
//                   fontSize: "10px",
//                 },
//                 "& label.Mui-focused": {
//                   color: "var(--secondary-color) !important",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "yellow",
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                 },
//               }}
//               //className={style.username}
//               //value={phone}
//               onChange={handlePhone}
//               //error={barberNameError}
//               //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
//               inputProps={{
//                 pattern: "[0-9]+",
//               }}
//             />
//                     <TextField
//               id="outlined-basic"
//               label="آدرس "
//               variant="outlined"
//               fullWidth
//               required
//               type="text"
//               sx={{
//                 "& label": {
//                   transformOrigin: "right !important",
//                   left: "inherit !important",
//                   right: "1.75rem !important",
//                   fontSize: "small",
//                   color: "#807D7B",
//                   fontWeight: 400,
//                   overflow: "unset",
//                 },
//                 "& legend": {
//                   textAlign: "right",
//                   display: "flex",
//                   justifyContent: "center",
//                   fontSize: "10px",
//                 },
//                 "& label.Mui-focused": {
//                   color: "var(--secondary-color) !important",
//                 },
//                 "& .MuiInput-underline:after": {
//                   borderBottomColor: "yellow",
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   "& fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                   "&:hover fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                   "&.Mui-focused fieldset": {
//                     borderColor: "var(--secondary-color) !important",
//                   },
//                 },
//               }}
//               //className={style.username}
//               //value={address}
//               onChange={handleAddress}
//               //error={barberNameError}
//               //helperText={barberNameError ? "نام کاربری خود را وارد کنید" : ""}
//               // inputProps={{
//               //   pattern: "[A-Za-z ]+",
//               // }}
//             />
//                     <TextField
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             "& .MuiOutlinedInput-notchedOutline": {
//                               //borderColor: "#2e2e2e",
//                             },
//                             "&.Mui-focused": {
//                               "& .MuiOutlinedInput-notchedOutline": {
//                                 borderColor: "var(--secondary-color)",
//                                 //borderWidth: "2px",
//                               },
//                             },
//                             "&:hover:not(.Mui-focused)": {
//                               "& .MuiOutlinedInput-notchedOutline": {
//                                 borderColor: "var(--secondary-color-lighter)",
//                               },
//                             },
//                           },
//                            "& .MuiInputLabel-outlined": {
                            
//                              fontWeight: "bold",
//                              "&.Mui-focused": {
//                                color: "var(--secondary-color)",
//                                fontWeight: "bold",
//                              },
//                            },

//                         }}
//                         id="outlined-select-currency"
//                         select
//                         label="جنسیت"
//                         defaultValue="ML"
//                     >
//                     {currencies.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                     </TextField>
                    
//                 </div>
//                 <div className={style.changebutt}>
//                 <Stack direction="row" spacing={2} gap={1}>
//                     <Button type="button" variant="contained" onClick={edit} sx={{m :1,bgcolor : 'var(--secondary-color)'}} startIcon={<checkIcon/>}>
//                       ایجاد سالن
//                     </Button>
//                 </Stack>
//                 </div>
//             </Box>
//         </div>
//     );
// };

// export default CreateSalon;

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
    setbarbers([barberId])
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
          <h3>اطلاعات شخصی</h3>
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