import React from "react";
import { Link } from "react-scroll";
import style from "../styles/UserNavbar.module.scss";


const Usernavbar = ({ setLoginHovered }) => {
    return (
        <div className={style.header}>
          <nav className={style.navbar}>
            <ul className={style.navMenu}>
              <a
                href="/"
                className={style.logo}
              >
              </a>
              <li className={style.navItem}>
                <Link
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  صفحه شخصی
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
                  رزرو ها
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
                کیف پول
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
}
export default Usernavbar;
