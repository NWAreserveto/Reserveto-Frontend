import { Link } from "react-scroll";
import style from "../styles/Navbar.module.scss";

const Navbar = ({ setLoginHovered }) => {
  return (
    <div className={style.header}>
      <nav className={style.navbar}>
        <ul className={style.navMenu}>
          <a
            href="/"
            className={style.logo}
          >
            <h2>رزروتو</h2>
          </a>
          <li className={style.navItem}>
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
        <a
          className={style.login}
          href="/Login"
          onMouseEnter={() => {
            setLoginHovered(true);
          }}
          onMouseLeave={() => {
            setLoginHovered(false);
          }}
        >
          ورود | عضویت
        </a>
      </nav>
    </div>
  );
};

export default Navbar;
