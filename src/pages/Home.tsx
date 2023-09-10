import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

export const Home = () => {
  return <div>{isMobile ? <Mobile /> : <Web />}</div>;
};

const Web = () => {
  const nav = useNavigate();

  return (
    <div className="home-intro">
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "150px" }}>Hammond Castle</h1>
        <h2 style={{ fontSize: "50px" }}>Gloucester, Massachusetts</h2>
        <h3 style={{ fontSize: "30px", paddingTop: "20px" }}>June 2nd, 2024</h3>
      </div>

      <button onClick={() => nav("/rsvp?step=1")} className="rsvp-button">
        RSVP
      </button>
    </div>
  );
};

const Mobile = () => {
  const nav = useNavigate();

  return (
    <div className="home-intro">
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "50px" }}>Hammond Castle</h1>
        <h2 style={{ fontSize: "20px" }}>Gloucester, Massachusetts</h2>
        <h3 style={{ fontSize: "20px", paddingTop: "20px" }}>June 2nd, 2024</h3>
      </div>

      <button onClick={() => nav("/rsvp?step=1")} className="rsvp-button">
        RSVP
      </button>
    </div>
  );
};
