import React from "react";

function LoadingScreen() {
  return (
    <>
      <section className="d-flex flex-column justify-content-center align-items-center vh-100">
        <div className="sk-chase">
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
          <div className="sk-chase-dot"></div>
        </div>
      </section>
    </>
  );
}

export default LoadingScreen;
