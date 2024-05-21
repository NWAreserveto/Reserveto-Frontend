import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import style from "../../styles/Dashboard.module.scss";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className={style.dashboard}>
      <div className={style.menu}>
        <Paper className={style.card}>
          <div className={style.header}>
            <EventIcon
              fontSize="large"
              sx={{ bgcolor: "var(--primary-color)", borderRadius: "10px" }}
            />
            <div>
              <h3>رزروها</h3>
              <h5>123</h5>
            </div>
          </div>
          <Divider flexItem />
          <Link>مشاهده رزورها</Link>
        </Paper>
        <Paper>
          <EventIcon />
          محصولات
        </Paper>{" "}
        <Paper>
          <EventIcon />
          محصولات
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard;
