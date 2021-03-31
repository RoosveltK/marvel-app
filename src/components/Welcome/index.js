import React, { useState, useEffect, Fragment, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = (props) => {
  const [userSession, setUserSession] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const sess = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : props.history.push("/login");
    });
    return () => {
      sess();
    };
  }, []);

  return userSession === null ? (
    <Fragment>
      <div className="loader"></div>
      <p className="loaderText">Please wait</p>
    </Fragment>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  );
};

export default Welcome;
