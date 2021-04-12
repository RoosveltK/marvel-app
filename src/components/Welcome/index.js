import React, { useState, useEffect, Fragment, useContext } from "react";
import { FirebaseContext } from "../Firebase";
import Logout from "../Logout";
import Quiz from "../Quiz";

const Welcome = (props) => {
  // const [userSession, setUserSession] = useState(null);
  // const [userData, setUserData] = useState({});
  // const firebase = useContext(FirebaseContext);
  const user = {
    pseudo: "KN",
  };

  // useEffect(() => {
  //   const sess = firebase.auth.onAuthStateChanged((user) => {
  //     user ? setUserSession(user) : props.history.push("/login");
  //   });
  //   if (userSession !== null) {
  //     firebase
  //       .user(userSession.uid)
  //       .get()
  //       .then((doc) => {
  //         if (doc && doc.exists) {
  //           const myData = doc.data();
  //           setUserData(myData);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  //   return () => {
  //     sess();
  //   };
  // }, [userSession]);

  // return userSession === null ? (
  //   <Fragment>
  //     <div className="loader"></div>
  //     <p className="loaderText">Please wait</p>
  //   </Fragment>
  // ) : (
  //   <div className="quiz-bg">
  //     <div className="container">
  //       <Logout />
  //       <Quiz userData={userData} />
  //     </div>
  //   </div>
  return (
    <Fragment>
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz userData={user} />
        </div>
      </div>
    </Fragment>
  );
};

export default Welcome;
