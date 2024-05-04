import Header from "../components/barberProfile/Header";
import Samples from "../components/barberProfile/Samples";
import Information from "../components/barberProfile/Information";
import Navbar from "../components/Navbar";
// import Reserve from "../components/barberProfile/Reserve";
import Services from "../components/barberProfile/Services";
import Comments from "../components/comments/Comments";
import Footer from "../components/Footer";

const BarberProfile = ( {userId, barber} ) => {
  return (
    <>
      <Navbar />

      <Header
        first_name={barber.first_name}
        last_name={barber.last_name}
        location={barber.location}
        profileImg={barber.profile_picture}
        backgroundImg={barber.background_image}
        point={barber.point}
      />

      <Information 
        bio={barber.bio}
      />

      <Samples 
        samples={barber.samples}
      />

      <Services />

      <Comments 
        userId={userId} 
        barberId={barber.id}
      />

      <Footer />
    </>
  );
};

export default BarberProfile;