import {
  HashRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import Landing from "./pages/Landing";
import BarbersLanding from "./pages/BarbersLanding";
import BarberProfile from "./pages/BarberProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route path="/BarbersLanding" element={<BarbersLanding />} />
        <Route path="/BarberProfile" element={<BarberProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
