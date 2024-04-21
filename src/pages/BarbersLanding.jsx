import { useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import MegaMenu from "../components/MegaMenu";
import BarbersCard from "../components/BarbersCard";
import Footer from "../components/Footer";
import style from "../styles/BarbersLanding.module.scss";
const BarbersLanding = () => {
  const [isHovered, setIsHoverd] = useState(false);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  return (
    <>
      <Navbar setIsHoverd={setIsHoverd} />
      <MegaMenu
        isHovered={isHovered}
        isMenuHovered={isMenuHovered}
        setIsMenuHovered={setIsMenuHovered}
      />
      <div
        className={`${style.barbersList} ${
          isHovered || isMenuHovered ? style.blurredContent : ""
        }`}
      >
        <BarbersCard name="کوشا لاهوتی" location="کرج"/>
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
    </>
  );
};

export default BarbersLanding;
