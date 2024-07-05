import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import Rating from '@mui/material/Rating';
import style from "../../styles/salon.module.scss";
import {TextareaAutosize} from "@material-ui/core";
import Comments from "../../components/comments/Comments";
import PhoneIcon from '@mui/icons-material/Phone';
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chip, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from "@mui/material/Typography";
import InputBase from '@mui/material/InputBase';
import Button from "@mui/material/Button";
//import { Button } from "react-scroll";
//import TextField from "@mui/material/TextField";
//import OrderList from "./OrderList";

const SalonComments = ({submitLabel,isComment,barberId,setComments,commentId = null}) => {
    const [value, setValue] = React.useState();
    const [rating, setRating] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const [text,setText] = useState('');
    const isTextareaDisabled = text.length === 0;

    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (text.trim() !== '') {
        try {
          if (rating === 0) {
            const input = {
              reply : text,
              commentId: commentId
            };
            //await POSTReplyAPI(input);
          }
          else {
            const input = {
              comment : text,
              rating: rating,
              barberId: barberId
            };
            //await POSTCommentAPI(input);
          }
  
          //const responseData = await GETBarberCommentsAPI(barberId);
          //setComments(responseData);
  
          setText('');
          setRating(0);
        } catch (error) {
          console.error(error);
        }
      }
    };
    const handleRatingChange = (e) => {
      setRating(parseInt(e.target.value));
    };
  return (
    <div className={style.saloncomments}>
        <h1>نظرات</h1>
      <Divider
        flexItem
        variant="middle"
        sx={{
          borderBottomWidth: "1px",
          borderBottomColor: "var(--secondary-color)",
          mt: "10px",
          mb: "10px",
        }}
      />
      <div>
        <box>
        </box>
      </div>
      <div className={style.commentcontainer}>
      <Box sx={{ display: 'flex',width:'100%','&:focus-within': {
      borderColor: 'var(--secondary-color)', // Change border color when focused
    }, alignItems: 'flex-start', mt:'60px',mb:'20px' }}>
        {/* <AccountCircle fontSize="large" sx={{ color: 'action.active',mb:'-20px', mx: 0.3, my: 0.5  }} />
        <TextField variant='filled' fullWidth  sx={{fontSize:'50px' ,"&:focus": {
            borderColor: "var(--secondary-color-lighter)"
  }}} onChange={(e)=>setText(e.target.value)} placeholder="نظرتو بنویس..."  variant='outlined' />
        <Rating
          sx = {{direction:'ltr',m:'10px'}}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            }}
        />
        <Button variant="outlined" sx={{ m:'10px',width:'130px', borderColor:"var(--secondary-color)",color:"var(--secondary-color)" ,
         '&:hover': {
          borderColor: 'var(--secondary-color-lighter)',
          color :'var(--secondary-color-lighter)'
        },
      }} placeholder="نظرتو بنویس..." disabled={isTextareaDisabled}>
          ارسال
        </Button> */}
        <Paper
      component="form"
      sx={{ p: '2px 1px', mb:'10px',mt:'-40px', display: 'flex', alignItems: 'center', width: '83%' }}
    >
      <AccountCircle fontSize="large" sx={{ color: 'var(--secondary-color)',mb:'-20px', mx: 0.3, my: 0.5  }} />
      <TextareaAutosize
              minRows={2}
              maxRows={10}
              style={{ width: '100%', border: `1px solid ${isFocused ? 'var(--secondary-color)' : 'white'}`,transition: 'border-color 0.3s', fontSize: '16px', padding: '8px' }}
              placeholder="نظرتو بنویس..."
              value={text}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setText(e.target.value)}
            />
      
      <Button variant="outlined" sx={{ m:'10px',width:'130px', borderColor:"var(--secondary-color)",color:"var(--secondary-color)" ,
         '&:hover': {
           borderColor: 'var(--secondary-color-lighter)',
           color :'var(--secondary-color-lighter)'
           },
           }} placeholder="نظرتو بنویس..." disabled={isTextareaDisabled}>
          ارسال
        </Button>
        <Divider sx={{ height: 60, m: 0.5 }} orientation="vertical" />
        {/* <Rating
          sx = {{direction:'ltr',m:'10px'}}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            }}
        /> */}
    </Paper>
      </Box>
      
        {/* <Comments/>  */}
      </div>
      {/* <OrderList /> */}
    </div>
  );
};

export default SalonComments;
