
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route path="/Home" element={<BarbersLanding />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;