import React from "react";

const Footer = () => {
  const styleText = {
    textAlign: "center",
  };
  return (
    <footer>
      <div className="footer-container">
        <p style={styleText}>
          Projet réalisé lors de l'apprentissage de React js <br />
          KN COORP PROJECT&trade;
        </p>
      </div>
    </footer>
  );
};

export default Footer;
