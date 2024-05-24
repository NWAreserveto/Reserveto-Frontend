import style from "../styles/BarbersLandingNavbar.module.scss";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Logout from "@mui/icons-material/Logout";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReserveCard from "./ReserveCard";
import { Popover } from "@mui/material";

const BarbersLandingNavbar = ({ setParentSearch }) => {
  const navigate = useNavigate();
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const [reserveMenuAnchorEl, setReserveMenuAnchorEl] = useState(null);
  const isAccountMenuOpen = Boolean(accountMenuAnchorEl);

  const handleAccountMenuClick = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleReserveMenuClick = (event) => {
    setReserveMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAccountMenuAnchorEl(null);
    setReserveMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
  };

  return (
    <>
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
              <IconButton
                onMouseOver={handleReserveMenuClick}
                aria-controls={isAccountMenuOpen ? "reserve-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isAccountMenuOpen ? "true" : undefined}
              >
                <EventAvailableIcon
                  sx={{
                    color: "var(--secondary-color)",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                />
              </IconButton>
              <Popover
                id="reserve-menu"
                disableScrollLock
                open={Boolean(reserveMenuAnchorEl)}
                anchorEl={reserveMenuAnchorEl}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    maxHeight: "550px",
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    ml: -3,
                    "&::before": {
                      content: '""',
                      display: "flex",
                      position: "absolute",
                      flexDirection: "row",
                      top: 0,
                      left: 17,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <div
                  style={{
                    overflow: "scroll",
                    maxHeight: "500px",
                    margin: "auto",
                  }}
                >
                  <ReserveCard />
                  <ReserveCard />
                  <ReserveCard />
                </div>
              </Popover>
            </li>
            <li>
              <IconButton
                onClick={handleAccountMenuClick}
                aria-controls={isAccountMenuOpen ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isAccountMenuOpen ? "true" : undefined}
              >
                <AccountCircleIcon
                  sx={{
                    color: "var(--secondary-color)",
                    fontSize: "30px",
                    fontWeight: "500",
                  }}
                />
              </IconButton>
              <Menu
                id="account-menu"
                anchorEl={accountMenuAnchorEl}
                open={isAccountMenuOpen}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                disableScrollLock
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    width: 220,
                    "&::before": {
                      content: '""',
                      display: "flex",
                      position: "absolute",
                      flexDirection: "row",
                      top: 0,
                      left: 17,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem
                  className={style.nonClickableMenuItem}
                  disableRipple
                  disableTouchRipple
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  sx={{ padding: "8px 10px" }}
                >
                  <ListItemIcon>
                    <Avatar
                      fontSize="small"
                      sx={{ width: 40, height: 40 }}
                    />
                  </ListItemIcon>
                  <div className={style.personalInfo}>
                    <div>سجاد میرجلیلی</div>
                    <div>sajadmirjalili</div>
                  </div>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    navigate("../UserProfile/5");
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  پروفایل
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <CalendarTodayIcon fontSize="small" />
                  </ListItemIcon>
                  رزرو ها
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <BookmarkIcon fontSize="small" />
                  </ListItemIcon>
                  علاقمندی ها
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  خروج
                </MenuItem>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default BarbersLandingNavbar;
