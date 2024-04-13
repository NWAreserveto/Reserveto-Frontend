import style from "../styles/MegaMenu.module.scss";
import SearchTab from "./SearchTab";

const MegaMenu = ({ isHovered, isMenuHovered, setIsMenuHovered }) => {
  return (
    <div
      className={`${style.MegaMenu} ${
        isHovered || isMenuHovered ? style.block : ""
      }`}
      onMouseEnter={() => setIsMenuHovered(true)}
      onMouseLeave={() => setIsMenuHovered(false)}
    >
      <div className={style.container}>
        
      </div>
    </div>
  );
};

export default MegaMenu;
