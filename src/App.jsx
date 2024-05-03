import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import Landing from "./pages/Landing";
import BarbersLanding from "./pages/BarbersLanding";
import BarberProfile from "./pages/BarberProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />

        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/password_reset/:tempToken" element={<NewPassword />} />
        <Route path="/BarbersLanding" element={<BarbersLanding />} />
        <Route path="/BarberProfile" element={<BarberProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
