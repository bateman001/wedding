import ladiesDress from "../utils/images/croppedDresses.png";
import suits from "../utils/images/mensSuits.png";
import dress from "../utils/images/hangingDress.png";
import { isMobile } from "react-device-detect";
import { colors } from "../utils/colors";
import flowers from "../utils/images/waterColorFlowers.PNG";
import { useState } from "react";
import { isBrowser } from "react-device-detect";
export const Dress = () => {
  if (isBrowser) {
    return <Web />;
  } else {
    return <Mobile />;
  }
};

const Web = () => {
  const [gender, setGender] = useState<"Ladies" | "Mens">("Ladies");

  return (
    <div
      style={{
        backgroundColor: "#fdfefd",
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "95vh",
          backgroundImage: `url(${dress})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f1f5f260",
          backgroundBlendMode: "saturation",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "50px" : "150px",
            width: "100%",
            justifySelf: "center",
            color: colors.green,
            textShadow: "0px 1px 5px rgba(128,128,128,0.84)",
          }}
        >
          Colorful Formal
        </h2>
      </div>

      <div
        style={{
          height: "100vh",
          backgroundColor: "#a6ae95",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", height: "80%", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                position: "relative",
                left: "10%",
                color: "white",
                // border: "1px solid black",
                textAlign: "center",
              }}
            >
              <h1 style={{ color: "#F1F5F2", fontSize: "150px" }}>{gender}</h1>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderBottom: `1.5px solid ${colors.green}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <p style={{ padding: "10px 30px", fontSize: "30px" }}>
                  {gender === "Ladies"
                    ? " We encourage you to wear formal dresses that radiate with the colors of the season"
                    : " We encourage tailored suits in bold, spring-inspired hues instead of the traditional black."}
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  borderTop: `1.5px solid ${colors.green}`,
                }}
              ></div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                // border: "1px solid black",
                justifyContent: "flex-end",
                position: "relative",
                left: "40%",
              }}
            >
              <img
                src={flowers}
                alt="flowers"
                style={{ width: "60%", transform: "scaleX(-1)" }}
              />
            </div>
          </div>

          <div
            style={{
              flex: 1,
              // border: "1px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                // border: "1px solid red",
                flex: 0.9,
                display: "flex",
                // justifyContent: "center",
                backgroundImage: `url(${
                  gender === "Ladies" ? ladiesDress : suits
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "40%",
                width: "100%",
                height: "80%",
              }}
            ></div>

            <div style={{ flex: 0.1 }}>
              <button
                className="rsvp-button"
                style={{ marginTop: "30px", zIndex: 3 }}
                onClick={() => {
                  const gnd = gender === "Ladies" ? "Mens" : "Ladies";

                  setGender(gnd);
                }}
              >
                Show {gender === "Ladies" ? "Mens" : "Ladies"}
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                position: "relative",
                right: "10%",
                color: "white",
                textAlign: "center",
              }}
            >
              <h1 style={{ color: "#F1F5F2", fontSize: "150px" }}>
                {gender === "Ladies" ? "Dress" : "Wear"}
              </h1>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  flex: 1,
                  borderBottom: `1.5px solid ${colors.green}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <p style={{ padding: "10px 30px", fontSize: "30px" }}>
                  Think bright and beautiful. Let your outfit reflect the warmth
                  and color of spring.
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  borderTop: `1.5px solid ${colors.green}`,
                }}
              ></div>
            </div>
            <div
              style={{
                flex: 1,
                // border: "1px solid black",
                display: "flex",
                justifyContent: "flex-start",
                position: "relative",
                right: "40%",
              }}
            >
              <img src={flowers} alt="flowers" style={{ width: "60%" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Mobile = () => {
  const [gender, setGender] = useState<"Ladies" | "Mens">("Ladies");

  return (
    <div
      style={{
        backgroundColor: "#a6ae95",
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          backgroundImage: `url(${dress})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#f1f5f260",
          backgroundBlendMode: "saturation",
        }}
      >
        <h2
          style={{
            fontSize: "100px",
            width: "100%",
            justifySelf: "center",
            color: colors.green,
            textShadow: "0px 1px 5px rgba(128,128,128,0.84)",
          }}
        >
          Colorful Formal
        </h2>
      </div>

      <div
        style={{
          height: "100vh",
          backgroundColor: "#a6ae95",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            color: "#F1F5F2",
            fontSize: "80px",
          }}
        >
          {gender} {gender === "Ladies" ? "Dress" : "Wear"}
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              padding: "10px ",
              fontSize: "25px",
              textAlign: "center",
            }}
          >
            {gender === "Ladies"
              ? " We encourage you to wear formal dresses that radiate with the colors of the season"
              : " We encourage tailored suits in bold, spring-inspired hues instead of the traditional black."}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            backgroundImage: `url(${
              gender === "Ladies" ? ladiesDress : suits
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "40%",
            width: "100%",
            height: "60%",
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="rsvp-button"
              style={{ marginTop: "30px", zIndex: 3 }}
              onClick={() => {
                const gnd = gender === "Ladies" ? "Mens" : "Ladies";

                setGender(gnd);
              }}
            >
              Show {gender === "Ladies" ? "Mens" : "Ladies"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
