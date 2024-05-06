import * as React from 'react';
import { useState, useEffect } from "react";
import Stack from '@mui/material/Stack';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Email } from '@mui/icons-material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import Info from './info';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Card from "../components/BarbersCard";
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import style from "../styles/info.module.scss"
import reservesImage from '../images/reserves.jpg';
import commentImage from '../images/comments.jpg';
import interestsImage from '../images/interests.jpg';


const images = [
  {
    url: reservesImage,
    title: 'رزرو ها',
    width: '30%',
  },
  {
    url: interestsImage,
    title: 'علاقه مندی ها',
    width: '30%',
  },
  {
    url: commentImage,
    title: 'نظرات من',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));


export default function SimpleBottomNavigation() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
    {/* <Box> */}
      {/* <div> */}
      <Box sx={{border:'5px', borderBlockColor: 'red', margin:'50px',borderRadius:'5px' , display: 'flex',justifyContent: 'center', flexWrap: 'wrap', minWidth: 300, width: '90%' }}>
      {images.map((image , index) => (
        <ImageButton onClick={()=>setSelectedTab(index)}
          focusRipple
          key={image.title}
          style={{
            //margin : '10px',
            border : '1px solid ',
            borderColor : 'black',
            borderRadius : '5px',
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    {/* </Box> */}
      {/* </div> */}
    </Box>
    {/* <Box className={style.selector_box} >
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
    </Box> */}
    </>
  );
}