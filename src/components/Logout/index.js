import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../Firebase";

const Logout = () => {
  const [check, setCheck] = useState(false);
  const firebase = useContext(FirebaseContext);
  useEffect(() => {
    if (check) {
      firebase.signOut();
    }
  }, [check, firebase]);
  return (
    <div className="logoutContainer">
      <label className="switch">
        <input
          type="checkbox"
          onChange={(e) => setCheck(e.target.checked)}
          checked={check}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default Logout;
