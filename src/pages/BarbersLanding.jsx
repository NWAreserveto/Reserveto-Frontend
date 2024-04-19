import { useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import MegaMenu from "../components/MegaMenu";
import BarbersCard from "../components/BarbersCard";
import Footer from "../components/Footer";
import style from "../styles/BarbersLanding.module.scss";

const BarbersLanding = () => {
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [selectedTab, setSelectedTab] = useState(null);

  return (
    <>
      <Navbar
        setIsHoverd={setIsHoverd}
        setSelectedTab={setSelectedTab}
      />
      <MegaMenu
        isHovered={isHovered}
        isMenuHovered={isMenuHovered}
        setIsMenuHovered={setIsMenuHovered}
        selectedTab={selectedTab}
      />
      <div className={isHovered || isMenuHovered ? style.blurredContent : ""}>
        <div className={style.barbersList}>
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
          <BarbersCard />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BarbersLanding;

