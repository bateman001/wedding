import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { Header } from "../components/Header";
import { LoadingScreen } from "../components/Loading";

export const Home = () => {
    return <div>{isMobile ? <Mobile /> : <Web />}</div>;
};

const Web = () => {
    const nav = useNavigate();

    return (
        <>
            <LoadingScreen />
            <Header />
            <div className="home-intro">
                <div
                    style={{
                        textAlign: "center",
                        // border: "1px solid red",
                        height: "60%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <div>
                        <h1 className="hammond-title">Hammond Castle</h1>
                        <h2 style={{ fontSize: "50px" }}>Gloucester, Massachusetts</h2>
                    </div>
                    <div>
                        <h3 style={{ fontSize: "30px", paddingTop: "20px" }}>June 2nd, 2024 • 5:30pm</h3>
                        <p style={{ fontSize: "20px" }}>Reception to follow</p>
                    </div>

                    <button onClick={() => nav("/rsvp?step=1")} className="rsvp-button">
                        RSVP
                    </button>
                </div>
            </div>
        </>
    );
};

const Mobile = () => {
    const nav = useNavigate();

    return (
        <>
            <Header />
            <div className="home-intro" style={{ height: "85vh" }}>
                <div style={{ textAlign: "center" }}>
                    <h1 style={{ fontSize: "50px" }}>Hammond Castle</h1>
                    <h2 style={{ fontSize: "20px" }}>Gloucester, Massachusetts</h2>
                    <h3 style={{ fontSize: "20px", paddingTop: "20px" }}>June 2nd, 2024 • 5:30pm</h3>
                    <p style={{ fontSize: "20px" }}>Reception to follow</p>
                </div>

                <button onClick={() => nav("/rsvp?step=1")} className="rsvp-button">
                    RSVP
                </button>
            </div>
        </>
    );
};
