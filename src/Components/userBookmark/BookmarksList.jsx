import BarbersCard from "../BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBookmarksList from "../../API/APIendpointBookmarksList";
import PropTypes from 'prop-types';
import APIendpointBarbersList from "../../API/APIendpointBarbersList";
import style from "../../styles/BarbersList.module.scss";
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const BookmarksList = ({}) => {
  const [barbers, setBarbers] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const token = localStorage.getItem("token");
  const userid = localStorage.getItem("customerId");
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        console.log(token);
        const responseData = await APIendpointBarbersList(token);
        setBarbers(responseData || []);
        setLoading1(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading1]);

  const [bookmarks, setBookmarks] = useState([]);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await APIendpointBookmarksList();
        setBookmarks(responseData || []);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [loading2]);

  const barberIds = bookmarks.map((bookmark) => bookmark.barber);
  const bookmarkBarbers = barbers.filter((barber) =>
    barberIds.includes(barber.id)
  );

  return (
    <div className={style.container}>
      <h1>علاقه‌مندی‌ها </h1>
    <Box className={loading1 && loading2 ? style.bookmarks : style.bookmarks}>
      {loading1 && loading2 ? (
        <Box sx={{ display:'flex',flexDirection:'row' }}>
        <Box sx={{pt : 0.5, m : 1}} >
          <Skeleton variant="rectangular" width={300} height={280} sx={{m:0}} />
          <Skeleton height='10%' />
        </Box>
        <Box sx={{ pt: 0.5,m : 1 }}>
          <Skeleton variant="rectangular" width={300} height={280} sx={{m:0}} />
          <Skeleton height='10%' />
        </Box>
        <Box sx={{ pt: 0.5,m : 1 }}>
          <Skeleton variant="rectangular" width={300} height={280} sx={{m:0}} />
          <Skeleton height='10%' />
        </Box>
        </Box>
        
      ) : (
        
        bookmarkBarbers.slice(0, 5).map((bookmarkBarber) => (
            <BarbersCard
              id={bookmarkBarber.id}
              name={bookmarkBarber.first_name + " " + bookmarkBarber.last_name}
              location={bookmarkBarber.location}
              profilePic={bookmarkBarber.profile_picture}
              customerId={userid}
              average_rating={bookmarkBarber.average_rating}
            />
          ))
      )}
    </Box>
    </div>
  );
};

export default BookmarksList;
