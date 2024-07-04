import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Landing from "./pages/Landing";
import UserProfile from "./pages/UserProfile";
import BarbersLanding from "./pages/BarbersLanding";
import BarberProfile from "./pages/BarberProfile";
import BarberDashboard from "./pages/BarberDashboard";
import SalonProfile from "./pages/SalonProfile";
import SalonPage from "./pages/SalonPage";
import UserBookmarks from "./pages/UserBookmarks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/salonProfile/:id" element={<SalonProfile />} />
        <Route path="/salonPage/:id" element={<SalonPage />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route
          path="/BarbersLanding/:customerId"
          element={<BarbersLanding />}
        />
        <Route path="/UserProfile/:id" element={<UserProfile />} />
        <Route path="/UserProfile/Bookmarks/:id" element={<UserBookmarks />} />
        <Route path="/BarberProfile/:barberId" element={<BarberProfile />} />
        <Route
          path="/Barber/Dashboard/:barberID"
          element={<BarberDashboard />}
        />
      </Routes>
      {/* <SalonProfile /> */}
    </Router>
  );
}

export default App;
