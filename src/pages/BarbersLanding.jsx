import { useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Footer from "../components/Footer";
import style from "../styles/BarbersLanding.module.scss";
import BarbersList from "../components/BarbersList";

const BarbersLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setParentSearch={setSearchQuery} />
      <BarbersList searchQuery={searchQuery} />
      <Footer />
    </>
  );
};

export default BarbersLanding;
