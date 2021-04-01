import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";

class Quiz extends Component {
  render() {
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>Question Quiz</h2>
        <p className="answerOptions">Question 1</p>
        <p className="answerOptions">Question 1</p>
        <p className="answerOptions">Question 1</p>
        <p className="answerOptions">Question 1</p>
        <button className="btnSubmit">Valider</button>
      </div>
    );
  }
}

export default Quiz;
