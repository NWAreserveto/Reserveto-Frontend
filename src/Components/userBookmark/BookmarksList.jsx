import BarbersCard from "../BarbersCard";
import { useEffect, useState } from "react";
import APIendpointBookmarksList from "../../API/APIendpointBookmarksList";
import APIendpointBarbersList from "../../API/APIendpointBarbersList";
import style from "../../styles/BarbersList.module.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const BookmarksList = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading1, setLoading1] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const responseData = await APIendpointBarbersList(token);
        setBarbers(responseData);
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
        setBookmarks(responseData);
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
    <Box className={loading1 && loading2 ? style.flex : style.barbersList}>
      {loading1 && loading2 ? (
        <CircularProgress />
      ) : (
        bookmarkBarbers
          .slice(0, 5)
          .map((bookmarkBarber) => (
            <BarbersCard
              id={bookmarkBarber.id}
              name={bookmarkBarber.first_name + " " + bookmarkBarber.last_name}
              location={bookmarkBarber.location}
              profilePic={bookmarkBarber.profile_picture}
            />
          ))
      )}
    </Box>
  );
};

export default BookmarksList;