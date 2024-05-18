import { useState } from "react";
import Navbar from "../components/BarbersLandingNavbar";
import Footer from "../components/Footer";
import style from "../styles/BarbersLanding.module.scss";
import BarbersList from "../components/BarbersList";
import ChatWidget from "../components/ChatWidget";

const BarbersLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar setParentSearch={setSearchQuery} />
      <BarbersList searchQuery={searchQuery} />
      <ChatWidget />
      <Footer />
    </>
  );
};

export default BarbersLanding;
