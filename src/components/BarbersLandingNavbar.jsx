import style from "../styles/BarbersLandingNavbar.module.scss";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchBar from "./SearchBar";

const BarbersLandingNavbar = ({ setParentSearch }) => {
  return (
    <div className={style.header}>
      <nav className={style.navbar}>
        <a
          href="/"
          className={style.logo}
        >
          <h2>رزروتو</h2>
        </a>
        <SearchBar setParentSearch={setParentSearch} />
        <ul className={style.navMenu}>
          <li>
            <IconButton>
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
