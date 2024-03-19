import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import CreateAcc from "./Components/CreateAcc";

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
