import {
  HashRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import BarbersCard from "./Components/BarberCard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
      </Routes>
    </BrowserRouter>
    // <BarbersCard />
  );
}

export default App;
