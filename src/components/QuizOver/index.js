import React, { Fragment, useEffect, useState } from "react";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  console.log(asked);
  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

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
      <div className="stepsBtnContainer">
        <p className="successMsg">Bravo, Vous etes un expert</p>
        <button className="btnResult success">Niveau Suivant</button>
      </div>

      <div className="percentage">
        <div className="progressPercent">Réussite : 10%</div>
        <div className="progressPercent">Note : 10/10</div>
      </div>

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
          <tbody>{datasReceive}</tbody>
        </table>
      </div>
    </Fragment>
  );
});

export default React.memo(QuizOver);
