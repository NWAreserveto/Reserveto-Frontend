
import {
  HashRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Login from "./pages/Login";
import CreateAcc from "./pages/CreateAcc";
import Landing from "./pages/Landing";
import UserProfile from "./pages/UserProfile";
import BarbersLanding from "./pages/BarbersLanding";
// function App() {
//   return (
//     <div className="App">
//       <UserProfile/>
//     </div>

//   }
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/CreateAcc" element={<CreateAcc />} />
        <Route path="/Home" element={<BarbersLanding />} />
        <Route path="/:userID" element={<UserProfile />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;