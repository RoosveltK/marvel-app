import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const griffeW = useRef(null);
  const [btnA, setbtnA] = useState(false);

  useEffect(() => {
    griffeW.current.classList.add("startingImg");
    setTimeout(() => {
      griffeW.current.classList.remove("startingImg");
      setbtnA(true);
    }, 1000);
  }, []);

  const imageDroite = () => {
    griffeW.current.classList.add("leftImg");
  };

  const imageGauche = () => {
    griffeW.current.classList.add("rightImg");
  };

  const clearImage = () => {
    if (griffeW.current.classList.contains("leftImg"))
      griffeW.current.classList.remove("leftImg");
    else if (griffeW.current.classList.contains("rightImg"))
      griffeW.current.classList.remove("rightImg");
  };
  const anim1 = btnA && (
    <Fragment>
      <div
        onMouseOver={imageDroite}
        onMouseOut={clearImage}
        className="leftBox"
      >
        <Link className="btn-welcome" to="/signup">
          Inscription
        </Link>
      </div>
      <div
        onMouseOver={imageGauche}
        onMouseOut={clearImage}
        className="rightBox"
      >
        <Link className="btn-welcome" to="/login">
          Connexion
        </Link>
      </div>
    </Fragment>
  );

  return (
    <main ref={griffeW} className="welcomePage">
      {anim1}
    </main>
  );
};

export default Landing;
