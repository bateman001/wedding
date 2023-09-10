import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { RSVP } from "./pages/RSVP";
import { Dress } from "./pages/Dress";
import { RSVPState } from "./context/rsvpState";

function App() {
  return (
    <div className="App">
      <RSVPState>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/dress-code" element={<Dress />} />
        </Routes>
      </RSVPState>
    </div>
  );
}

export default App;
