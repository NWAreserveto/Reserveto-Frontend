import React, { Component, useState } from 'react';
import { Avatar, Box, CardMedia, Typography, BottomNavigation } from "@mui/material";
import Services from './BarberProfile_Services';
import Samples from './BerberProfile_Samples';
import Information from './BerberProfile_Information';
import Reserve from './BerberProfile_Reserve';
import Comments from './comments/Comments'
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import CommentIcon from '@mui/icons-material/Comment';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';
import CollectionsIcon from '@mui/icons-material/Collections';
import DoneIcon from '@mui/icons-material/Done';


const pages = [
    {label: 'نمونه کار', tag: <Samples />, icon: <CollectionsIcon/>}, // 2
    {label: 'خدمات', tag: <Services />, icon: <DoneIcon/>}, // 1
    {label: 'من کیم ؟', tag: <Information />, icon: <InfoIcon/>}, // 2
    {label: 'رزرو', tag: <Reserve />, icon: <EventIcon/>}, // 2
    // {label: 'نظرات', tag: <Comments />, icon: <CommentIcon/>}, // 2
]

const Body = () => {
    const [value, setValue] = useState(0);

    return (
        <Box
            sx={{
                mt: 16,
                mb: 5,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <Box
                sx={{
                    margin: '0 20px',
                    display: 'flex',
                    height: '500px',
                    width: '1260px',
                    alignItems: 'center',
                    boxShadow: '0 0 50px #8CB69B',
                    backgroundColor: '#e8dbc4',
                    borderRadius: "30px",
                    flexDirection: 'column',
                }}>
                <BottomNavigation
                    sx={{
                        mt: 2.5,
                        height: 65,
                        width: {xs: 350, sm: 400, md:450, lg: 550},
                        bgcolor: '#F9F2DE',
                        borderRadius: '10px',
                    }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }} >

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
                            icon={page.icon}
                            value={page.tag}
                        />
                    ))} 

                </BottomNavigation>
                {value}
            </Box>
        </Box>
    )
}

export default Body;