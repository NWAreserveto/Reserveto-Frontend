import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/Newpassword/:tempToken" element={<NewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
