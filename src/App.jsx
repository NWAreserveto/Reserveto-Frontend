import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Login />} />
        <Route path="/CreateAcc" element= {<CreateAcc />} />
      </Routes>
    </Router>
  );
}

export default App;
