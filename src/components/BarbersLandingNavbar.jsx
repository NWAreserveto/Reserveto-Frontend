import style from "../styles/BarbersLandingNavbar.module.scss";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SearchTab from "./SearchTab";
import NotificationList from "./NotificationList";

const BarbersLandingNavbar = ({ setIsHoverd, setSelectedTab }) => {
  return (
    <div className={style.header}>
      <nav className={style.navbar}>
        <ul className={style.navMenu}>
          <a href="/" className={style.logo}>
            <h2>رزروتو</h2>
          </a>
          <li
            className={style.navItem}
            onMouseEnter={() => setIsHoverd(true)}
            onMouseLeave={() => setIsHoverd(false)}
          >
            <a href="/">آرایشگران</a>
          </li>
          <li
            className={style.navItem}
            onMouseEnter={() => setIsHoverd(true)}
            onMouseLeave={() => setIsHoverd(false)}
          >
            <a href="/">آرایشگاه ها</a>
          </li>
          <li
            className={style.navItem}
            onMouseEnter={() => setIsHoverd(true)}
            onMouseLeave={() => setIsHoverd(false)}
          >
            <a href="/">خدمات</a>
          </li>
        </ul>
        <ul className={style.navMenu}>
          <li>
            <IconButton
              onClick={() => {
                setIsHoverd((prevIsHovered) => !prevIsHovered);
                setSelectedTab(SearchTab);
              }}
            >
              <SearchIcon
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "30px",
                  fontWeight: "500",
                }}
              />
            </IconButton>
          </li>
          <li>
            <IconButton
              onClick={() => {
                setIsHoverd((prevIsHovered) => !prevIsHovered);
                setSelectedTab(NotificationList);
              }}
            >
              <NotificationsIcon
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "30px",
                  fontWeight: "500",
                }}
              />
            </IconButton>
          </li>
          <li>
            <IconButton>
              <AccountCircleIcon
                sx={{
                  color: "var(--secondary-color)",
                  fontSize: "30px",
                  fontWeight: "500",
                }}
              />
            </IconButton>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default BarbersLandingNavbar;
