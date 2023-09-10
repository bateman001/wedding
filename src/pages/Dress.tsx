import ladiesDress from "../utils/images/dresses.png";
import suits from "../utils/images/suits.png";
import pinkDress from "../utils/images/pinkDress.jpg";

export const Dress = () => {
  return (
    <div
      style={
        {
          // border: "1px solid red",
          // textAlign: "center",
          // margin: "10px",
          // display: "flex",
          // flexDirection: "column",
          // alignItems: "center",
          // height: "80vh",
        }
      }
    >
      <div
        style={{
          // border: "1px solid red",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          backgroundImage: `url(${pinkDress})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* <h1 style={{ fontSize: "50px" }}>Dress Code</h1> */}
        <h2
          style={{
            fontSize: "150px",
            width: "100%",
            // border: "1px solid red",
            justifySelf: "center",
            marginBottom: "100px",
          }}
        >
          Colorful Formal
        </h2>
      </div>

      {/* <div style={{ display: "flex", height: "80vh" }}>
        <div
          style={{
            padding: "0 5%",
            // border: "1px solid red",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1 style={{ flex: 1 }}>Ladies</h1>
          <p style={{ flex: 1, margin: "10px 0" }}>
            Ladies, we encourage you to wear formal dresses that radiate with
            the colors of the season. Think bright and beautiful, let your
            outfit reflect the warmth and color of spring.
          </p>

          <img
            src={ladiesDress}
            alt="ladies-dress"
            style={{ flex: 1, width: "70%" }}
          />
        </div>

        <div
          style={{
            padding: "0 5%",
            // border: "1px solid red",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h1 style={{ flex: 1 }}>Men</h1>
          <p style={{ flex: 1, margin: "10px 0" }}>
            Ladies, we encourage you to wear formal dresses that radiate with
            the colors of the season. Think bright and beautiful, let your
            outfit reflect the warmth and color of spring.
          </p>

          <img src={suits} alt="mens-dress" style={{ flex: 1, width: "65%" }} />
        </div>
      </div> */}
    </div>
  );
};
