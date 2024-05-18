import { useState } from "react";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import About from "../components/About";
import Tutorial from "../components/Tutorial";
  
const Landing = () => {
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  return (
    <>
      <Navbar setLoginHovered={setIsLoginHovered} />
      <HeroSection isLoginHovered={isLoginHovered} />
      <Services />
      <Tutorial />
      <About />
      <Footer />
    </>
  );
};

export default Landing;
