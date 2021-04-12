import React, { Fragment, useEffect, useState } from "react";
import { GiTrophyCup } from "react-icons/gi";
const QuizOver = React.forwardRef((props, ref) => {
  const {
    levelNames,
    score,
    maxQuestion,
    quizLevel,
    percent,
    loadNextLevel,
  } = props;
  const [asked, setAsked] = useState([]);

  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  if (score < maxQuestion / 2) {
    setTimeout(() => loadNextLevel(0), 3000);
  }

  const decision =
    score >= maxQuestion / 2 ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant</p>
              <button
                className="btnResult success"
                onClick={() => loadNextLevel(quizLevel)}
              >
                Niveau Suivant
              </button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">
                <GiTrophyCup size="50px" />
                Bravo, vous etes un expert
              </p>
              <button
                className="btnResult     "
                onClick={() => loadNextLevel(0)}
              >
                Recommencez
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note : {score}/{maxQuestion}
          </div>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échouez</p>
        </div>

        <div className="percentage">
          <div className="progressPercent">Réussite : {percent}%</div>
          <div className="progressPercent">
            Note : {score}/{maxQuestion}
          </div>
        </div>
      </Fragment>
    );

  const datasReceive = asked.map((question) => {
    return (
      <tr key={question.id}>
        <td>{question.question}</td>
        <td>{question.answer}</td>
        <td>
          <button className="btnInfo">Infos</button>
        </td>
      </tr>
    );
  });

  return (
    <Fragment>
      {decision}
      <hr />
      <p>Réponses aux questions :</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Réponses</th>
              <th>Informations</th>
            </tr>
          </thead>
          <tbody>
            {score >= maxQuestion / 2 ? (
              datasReceive
            ) : (
              <tr>
                <td colSpan="3">
                  <div className="loader"></div>
                  <p style={{ textAlign: "center", color: "red" }}>
                    Pas de réponses
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
