import { useEffect, useRef, useState } from "react";
import { GiCastle } from "react-icons/gi";
import { CSSTransition } from "react-transition-group";

export const LoadingScreen = () => {
  const nodeRef = useRef(null);
  const hasVisited = sessionStorage.getItem("hasVisited");

  const [isLoading, setIsLoading] = useState(hasVisited ? false : true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      sessionStorage.setItem("hasVisited", "true");

      // Simulate delay to wait for contents to load
      // Replace this with your actual data loading logic
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
    } else {
      setIsLoading(false);
    }
  }, []);

  console.log("isLoading", isLoading);
  return (
    <CSSTransition
      in={isLoading}
      timeout={3000}
      classNames="loading"
      unmountOnExit
      mountOnEnter={isLoading}
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>
        <div
          style={{
            backgroundColor: "#e7ded8",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            zIndex: "2",
            width: "100%",
          }}
        >
          <div
            className="wrap"
            style={{
              //   border: "3px solid black",
              padding: "10px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <GiCastle
              size={125}
              className="castle"
              style={{
                border: "3px solid black",
                padding: "10px",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};
