import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/BarbersLandingNavbar";
import Footer from "../components/Footer";
import style from "../styles/BarbersLanding.module.scss";
import BarbersList from "../components/BarbersList";
import ChatWidget from "../components/ChatWidget";

const BarbersLanding = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { customerId } = useParams();

  return (
    <>
      <Navbar setParentSearch={setSearchQuery} />
      <BarbersList searchQuery={searchQuery} customerId={customerId} />
      <ChatWidget />
      <Footer />
    </>
  );
};

export default BarbersLanding;
