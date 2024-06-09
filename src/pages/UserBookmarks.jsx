import Navbar from "../components/BarbersLandingNavbar";
import Footer from "../components/Footer";
import BookmarksList from "../components/userBookmark/BookmarksList";

const BarberProfile = () => {
  return (
    <>
      <Navbar />
      <BookmarksList/>
      <Footer />
    </>
  );
};

export default BarberProfile;