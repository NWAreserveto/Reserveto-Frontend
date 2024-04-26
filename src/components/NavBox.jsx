import * as React from 'react';
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Email } from '@mui/icons-material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Info from './info';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Typography } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import style from "../styles/info.module.scss"
import { red } from '@mui/material/colors';


const reserves = () => {
    return (
        <>
        <Typography>
            page 2
        </Typography>
        </>
    );
}
const user = {
  name: 'پرهام هدایتی',
  username: 'phd',
  email: 'johndoe@example.com',
  location: 'تهران،تهران',
  followers: 100,
  following: 50,
  posts: 20
};

const pages = [
    {
        label : "اطلاعات شخصی",
        tag : <Info user={user}/>
    },
    {
      label : "رزروها",
      tag : <reserves/>,
  },
    {
      label : "کیف پول",
      tag : <Info user={user}/>
    }
]

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <>
    
    <Box className={style.selector_box} >
    <span className={style.ButtomNav}>
        <BottomNavigation
          sx={{
              height: {xs: 40, sm: 50, md: 60, lg: 65},
              width: {xs: 400, sm: 450, md:500, lg: 600},
              //bgcolor: '#F9F2DE',
              bgcolor : "var(--primary-color)",
              borderRadius: '10px',
              "& .Mui-selected, svg": {
                color: "var(--secondary-color-lighter)"
              },
              columnGap: {xs: 3, sm: 4, md: 5, lg: 1},
              //columnGap: 1,
              //flexDirection: 'row',
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >

        {pages.map((page) =>(
          <BottomNavigationAction 
            sx={{
                scale: '1',
                borderRadius: '10px',
            }}
            onClick={ (event) => {
                setValue(page.tag)
            }}
            label={page.label}
            value={page.tag}
          />
        ))}

        </BottomNavigation>
        </span>
        {value}
    </Box>
    </>
  );
}