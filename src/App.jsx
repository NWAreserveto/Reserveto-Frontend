import {
  HashRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import BarbersCard from "./Components/BarberCard";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
    // <BarbersCard />
  );
}

export default App;
