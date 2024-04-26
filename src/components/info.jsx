import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Editprofile from "./edirprofile"
import style from '../styles/info.module.scss';
import { Email } from '@mui/icons-material';

const Info = ({ user }) => {
  const [value, setValue] = React.useState(0);
  const pages = [
    {
        label : " ویرایش پروفایل",
        tag : < Editprofile/>
    },
  ]
  return (
    <>

    <box className={style.info}>
        <span className={style.editcontainer}>
        <BottomNavigation
          sx={{
              //zIndex: 'tooltip',
              height: {xs: 40, sm: 50, md: 60, lg: 65},
              width: {xs: 400, sm: 450, md:500, lg: 200},
              mt: -2,
              "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
                color: "white"
              },
              bgcolor : "var(--overlay)",
              borderRadius: '10px',
              // columnGap: {xs: 3, sm: 4, md: 5, lg: 1},
              columnGap: 1,
              flexDirection: 'row',
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
        {/* <a
            className={style.edit}
            href="/"
        >
          ویرایش پروفایل
        </a> */}
        <p>
      <div className={style.icon}>
        <Stack direction="row" alignItems="center" margin={0}>
          <AccountCircleIcon fontSize="large" sx={{color: 'var(--secondary-color)'}}/>
          <Typography variant="body1"><h3>نام کاربری</h3></Typography>
        </Stack>
        </div>
         {user.name}</p>
      <p>
      <div className={style.icon}>
        <Stack direction="row" alignItems="center">
          <Email fontSize="large" sx={{color: 'var(--secondary-color)'}}/>
          <Typography variant="body1"><h3>ایمیل</h3></Typography>
        </Stack>
        </div>
         {user.email}</p>
      <p>
      {/* <div className={style.icon}> */}
        <Stack direction="row" alignItems="center" >
          <MyLocationIcon fontSize="large" sx={{color: 'var(--secondary-color)'}}/>
          <Typography variant="body1"><h3>آدرس</h3></Typography>
        </Stack>
        {/* </div> */}
         {user.location}</p>
    </box>
    </>
  );
};

export default Info;