import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { RSVP } from "./pages/RSVP";
import { Dress } from "./pages/Dress";
import { RSVPState } from "./context/rsvpState";
import { Travel } from "./pages/Travel";

function App() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <div className="App">
      <RSVPState>
        {pathname === "/" ? <></> : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/dress-code" element={<Dress />} />
          <Route path="/travel" element={<Travel />} />
        </Routes>
      </RSVPState>
    </div>
  );
}

export default App;
