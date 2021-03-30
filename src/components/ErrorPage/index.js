import React from "react";
import imgBatman from "../../images/batman.png";

const ErrorPage = () => {
  const styleH2 = {
    textAlign: "center",
  };
  const styleTof = {
    display: "block",
    margin: "40px auto",
  };
  return (
    <div className="quiz-bg">
      <div className="container">
        <h2 style={styleH2}>Oups, cette page n'éxiste pas 😫 </h2>
        <img style={styleTof} src={imgBatman} alt="Image for Error page" />
      </div>
    </div>
  );
};

export default ErrorPage;
