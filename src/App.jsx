import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Landing from "./pages/Landing";
import UserProfile from "./pages/UserProfile";
import BarbersLanding from "./pages/BarbersLanding";
import BarberDashboard from "./pages/BarberDashboard";
import BarberProfile from "./pages/BarberProfile";

//   }
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route path="/BarbersLanding/:id" element={<BarbersLanding />} />
        <Route path="/UserProfile/:id" element={<UserProfile/>}/>
        <Route path="/BarberProfile/:barberId" element={<BarberProfile />} />
        <Route path="/Barber/Dashboard/:barberID" element={<BarberDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
