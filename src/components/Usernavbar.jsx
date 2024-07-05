import React, {useEffect, useState } from "react";
import Popup from "../components/barberProfile/Popup";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import UserBookmarks from "./userBookmark/BookmarksList";
import style from '../styles/UserNavbar.module.scss';
import { Box, Typography, Button } from "@mui/material";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
const UserNavbar = ({user}) => {
  const [index , setIndex] = useState(1);
  const [fix, setFix] = useState(false);
  console.log("user is : "+user);
  function setFixed() {
    if (window.scrollY >= 292) setFix(true);
    else setFix(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);
  const main = () => {
    switch (index) {
      case 0:
        return <UserBookmarks/>
      case 1:
        return <UserBookmarks/>
      default:
    }
  };
  return (
    <>
    <div className={style.container}>
      <Box
        sx={{
          bgcolor: "var(--primary-color)",
          borderRadius: 3,
          width: "350px",
          height: "500px",
          mb : '20px',
          p: 1,
          display: "flex",
          flexDirection: "column",
          display : 'flex',
          //justifyContent : 'flex-start',
          //alignContent : 'flex-start',
          //alignItems : 'flex-start',
          //boxShadow: "0px 1px 1px green",
        }}
      >
        <Box
        sx={{display :'inline', position : 'relative' , mb : 2}}
        >
          <Avatar
          //src={user.profile_picture}
          sx={{
            border: "solid 2px ${randomColor}",
            bgcolor: stringToColor(user.user.username),
            height: "70px",
            mt : "-20px",
            mr : "10px",
            width: "70px",
            borderRadius: "50%",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          }}
         >
          {user.user.username.charAt(0)}
          </Avatar>
          <Typography // name
            sx={{
              position : 'absolute',
              bottom : 0,
              left : 0,
              ml : 2,
              color: 'var(--secondary-color)',
              pr: 5,
              fontSize: 22,
              mt: 2,
            }}
          >
            {/* {user.first_name + " " + user.last_name} */}
            {user.user.username}
          </Typography>
          </Box>
          <Box>
          <Divider
            flexItem
            variant="middle"
            sx={{
              borderBottomWidth: "1px",
              borderBottomColor: "var(--secondary-color)",
              mx:'5px',
              opacity: '0.5'
            }}
          />
          <Button
          onClick={() => setIndex(0)}
          fullWidth
          sx={{color : 'var(--secondary-color)',
            //mr: '10px',
            direction : 'rtl',
            display : 'flex',
            justifyContent : 'flex-start'
        }}
          >
            رزرو‌‌‌‌‌ها
          </Button>
          <Button
          onClick={() => setIndex(1)}
          fullWidth
          sx={{color : 'var(--secondary-color)',
            //mr: '10px',
            direction : 'rtl',
            display : 'flex',
            justifyContent : 'flex-start'
        }}
          >
            علاقه‌مندی‌ها
          </Button>
          <Button
          variant="outlined"
          fullWidth
          //onClick={onClick}
          endIcon={<EditIcon />}
          sx={{
            my : 2,
            p: 2,
            color : "var(--secondary-color)",
            borderColor : "var(--secondary-color)",
            //bgcolor: "var(--secondary-color)",
            "&:hover": {
              bgcolor: "var(--secondary-color-lighter)",
            },
          }}
        >
          ویرایش پروفایل
        </Button>
        </Box>
      </Box>
      <div className={style.main}>{main()}</div>
    </div>
    </>
  );
};

export default UserNavbar;
