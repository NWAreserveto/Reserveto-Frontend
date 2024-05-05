import NotificationCard from "./NotificationCard";

import style from "../styles/NotificationList.module.scss";

const NotificationList = () => {
  return (
    <div className={style.container}>
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
      <NotificationCard />
    </div>
  );
};

export default NotificationList;
