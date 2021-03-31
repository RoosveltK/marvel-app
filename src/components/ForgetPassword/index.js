import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

const ForgetPassword = (props) => {
  const styles = {
    border: "1px solid green",
    background: "green",
    color: "#fff",
  };
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dislike = email === "";
  const handleSubmit = (event) => {
    event.preventDefault();
    firebase
      .ressetPassword(email)
      .then(() => {
        setError(null);
        setSuccess(
          "Consulter votre boite mail pour réinitialiser votre mot de passe"
        );
        setEmail("");
        setTimeout(() => {
          props.history.push("/login");
        }, 3000);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && <span style={styles}>{success}</span>}
            {error && <span>{error.message}</span>}
            <h2>Récupérer votre Compte</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autocomplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <button disabled={dislike}>Récupérer</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déja inscrit ? Connectez-vous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
