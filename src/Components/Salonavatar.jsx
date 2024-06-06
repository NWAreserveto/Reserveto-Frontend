// import React from "react";
// import Stack from "@mui/material/Stack";
// import Typography from "@mui/material/Typography";
// import style from "../styles/Avatar.module.scss";
// import EditIcon from "@mui/icons-material/Edit";
// import Button from "@mui/material/Button";
// import { styled } from '@mui/material/styles';
// import Badge from '@mui/material/Badge';
// import Card from "./BarbersCard";
// import LocationIcon from "@mui/icons-material/LocationOn";
// import ProfileAvatar from "@mui/material/Avatar";
// import EmailIcon from "@mui/icons-material/Email";
// import ProfPic from "../images/profilePic.jpg";
// import Background from "../images/LoginBackground.jpg";

// // const salon = {
// //   name : 'سالن زیبایی مریم',
// //   email: 'johndoe@example.com',
// //   address:'تهران ، نیاوران',
// //   followers: 100,
// //   following: 50,
// //   posts: 20
// // };

// const Salonavatar = ({salon , onClick }) => {
//   return ( 
//   <box
//       className={style.back}
//       // sx={{
//       //   display : "grid",
//       //   backgroundImage:"url('../images//LoginBackground.jpg')",
//       //   backgroundRepeat: "no-repeat",
//       //   backgroundSize: "cover",
//       //   height: {xs: 40, sm: 50, md: 60, lg: 65},
//       //   width: {xs: 400, sm: 450, md:500, lg: 600},
//       //   }}
//     >
//       <span className={style.salonicon}>
//         <h1>{salon.name}</h1>
//         <Stack direction="row" alignItems="center">
//           <LocationIcon sx={{ color: "var(--secondary-color)" }} />
//           <Typography variant="body1">
//             <h4>{salon.address}</h4>
//           </Typography>
//         </Stack>
//       </span>
//       <div className={style.butt}>
//         <Button
//           variant="outlined"
//           onClick={onClick}
//           endIcon={<EditIcon />}
//           sx={{
//             p: 2,
//             borderColor : "var(--secondary-color)",
//             color : "white",
//             color: "var(--primary-color)",
//             "&:hover": {
//               borderColor : "var(--secondary-color-lighter)"
//               //bgcolor: "var(--secondary-color-lighter)",
//             },
//           }}
//         >
//           ویرایش مشخصات سالن
//         </Button>
//       </div>
//     </box>
//   )
// };

// export default Salonavatar;
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import CommentIcon from "@mui/icons-material/Comment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import StarIcon from "@mui/icons-material/Star";
import style from "../styles/Dashboard.module.scss";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Chip } from "@mui/material";
import OrderList from "../components/barberDashboard/OrderList";

const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.menu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <EventIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>رزروها</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده رزروها</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <CommentIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>نظرات</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده نظرات</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <NotificationsIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>اعلان</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده اعلان ها</Link>
        </Paper>
        <Paper className={style.card}>
          <div className={style.header}>
            <StarIcon
              fontSize="large"
              sx={{
                color: "var(--secondary-color)",
                borderRadius: "10px",
                fontSize: "50px",
              }}
            />
            <h3>امتیاز</h3>
          </div>
          <div className={style.score}>1111</div>
          <Divider flexItem />
          <Link>مشاهده امتیازات</Link>
        </Paper>
      </div>
      <OrderList />
    </div>
  );
};

export default Dashboard;

