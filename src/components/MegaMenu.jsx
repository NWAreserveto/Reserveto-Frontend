import style from "../styles/MegaMenu.module.scss";

const MegaMenu = ({
  isHovered,
  isMenuHovered,
  setIsMenuHovered,
  selectedTab,
}) => {
  return (
    <div
      className={`${style.MegaMenu} ${
        isHovered || isMenuHovered ? style.block : ""
      }`}
      onMouseEnter={() => setIsMenuHovered(true)}
      onMouseLeave={() => setIsMenuHovered(false)}
    >
      <div className={style.container}>{selectedTab}</div>
    </div>
  );
};

export default MegaMenu;
