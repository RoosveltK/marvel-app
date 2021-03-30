import React, { useRef, useEffect, useState, Fragment } from "react";

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

  const anim1 = btnA && (
    <Fragment>
      <div className="leftBox">
        <button className="btn-welcome">Inscription</button>
      </div>
      <div className="rightBox">
        <button className="btn-welcome">Connexion</button>
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
