import Navbar from "../components/BarbersLandingNavbar";
import Footer from "../components/Footer";
import BookmarksList from "../components/userBookmark/BookmarksList";
import BarbersLandingButton from "../components/userBookmark/BarbersLandingButton";

const BarberProfile = () => {
  return (
    <>
      <Navbar />
      <BookmarksList/>
      <BarbersLandingButton/>
      <Footer />
    </>
  );
};

export default BarberProfile;