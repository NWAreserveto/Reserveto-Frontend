import { Link } from "react-scroll";
import style from "../styles/Footer.module.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Divider from "@mui/material/Divider";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.container}>
        <div className={style.links}>
          <ul>
            <li>
              <h6>درباره رزروتو</h6>
            </li>
            <li>
              <Link
                to="services"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                خدمات
              </Link>
            </li>
            <li className={style.navItem}>
              <Link
                to="tutorial"
                spy={true}
                smooth={true}
                offset={-40}
                duration={500}
              >
                آموزش
              </Link>
            </li>
            <li className={style.navItem}>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={500}
              >
                درباره ما
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <h6>مشتریان</h6>
            </li>
            <li>
              <a>پنل ثبت نام</a>
            </li>
            <li>
              <a>رزرو وقت</a>
            </li>
            <li>
              <a>مشاهده خدمات</a>
            </li>
            <li>
              <a>مشاهده آرایشگران</a>
            </li>
            <li>
              <a>دریافت قیمت و مشاوره</a>
            </li>
          </ul>
          <ul>
            <li>
              <h6>آرایشگران</h6>
            </li>
            <li>
              <a>پنل ثبت نام</a>
            </li>
            <li>
              <a>قوانین و مقررات</a>
            </li>
          </ul>
          <ul>
            <li>
              <h6>درباره رزروتو</h6>
            </li>
            <li>
              <a>خدمات</a>
            </li>
            <li>
              <a>خدمات</a>
            </li>
            <li>
              <a>خدمات</a>
            </li>
            <li>
              <a>خدمات</a>
            </li>
          </ul>
        </div>
        <Divider
          flexItem
          sx={{
            borderBottomWidth: "2px",
            borderBottomColor: "var(--primary-color)",
          }}
        />
        <div className={style.sec}>
          <h4>رزروتو</h4>
          <p>کلیه حقوق مادی و معنوی محفوظ است. © ۱۴۰۳ رزروتو</p>
          <div className={style.socials}>
            <a>
              <InstagramIcon
                fontSize="medium"
                sx={{ color: "var(--primary-color-lighter)" }}
              />
            </a>
            <a>
              <XIcon
                fontSize="medium"
                sx={{ color: "var(--primary-color-lighter)" }}
              />
            </a>
            <a>
              <LinkedInIcon
                fontSize="medium"
                sx={{ color: "var(--primary-color-lighter)" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
