import { colors } from "../utils/colors";
import hammond from "../utils/images/gloucester.webp";

export const Travel = () => {
  return (
    <div>
      <div
        style={{
          height: "95vh",
          padding: "30px",
          // border: "1px solid black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage: `url(${hammond})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundColor: "#f1f5f260",
          backgroundBlendMode: "saturation",
        }}
      >
        <div
          style={{
            textAlign: "center",
            alignSelf: "center",
            // marginLeft: "auto",
          }}
        >
          <h2 style={{ fontSize: "60px" }}>Your guide to</h2>
          <h1 style={{ fontSize: "100px" }}>Gloucester, Massachusetts</h1>
        </div>
      </div>

      <div
        style={{
          height: "100vh",
          width: "100%",
          border: "1px solid red",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            alignSelf: "center",
            display: "flex",
            width: "100%",
            position: "relative",
            top: "-30px",
          }}
        >
          <div style={{ flex: 1, backgroundColor: colors.white }}>
            <h2>Hotel</h2>
          </div>
          <div style={{ flex: 1 }}>
            <h2>Airport</h2>
          </div>
          <div style={{ flex: 1 }}>
            <h2>Venue</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
