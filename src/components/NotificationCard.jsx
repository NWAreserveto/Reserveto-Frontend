import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import style from "../styles/Notification.module.scss";

const NotificationCard = () => {
  return (
    <div className={style.NotificationCard}>
      <AccountCircleIcon sx={{ fontSize: "50px" }} />
      <p>آرایشگاه تست</p>
      <p>اصلاح مو</p>
      <p>1403/02/01</p>
      <p>21:00:00</p>
    </div>
  );
};

export default NotificationCard;
