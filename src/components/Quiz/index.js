import React, { Component } from "react";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel/";

class Quiz extends Component {
  state = {
    levelType: ["debutant", "confirme", "expert"],
    quizLevel: 0,
    maxQuestion: 10,
    saveQuestion: [],
    question: null,
    options: [],
    idQuestion: 0,
  };

  loadQuestion = (quizz) => {
    const datas = QuizMarvel[0].quizz[quizz];
    if (datas.length >= this.state.maxQuestion) {
      const removeAnswer = datas.map(({ answer, ...Reste }) => Reste);
      this.setState({
        saveQuestion: removeAnswer,
      });
    } else {
      console.log("Pas assez de questions");
    }
  };

  componentDidMount() {
    this.loadQuestion(this.state.levelType[this.state.quizLevel]);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.saveQuestion !== prevState.saveQuestion) {
      this.setState({
        question: this.state.saveQuestion[this.state.idQuestion].question,
        options: this.state.saveQuestion[this.state.idQuestion].options,
      });
    }
  }

  render() {
    const question = this.state.options.map((option, index) => {
      return (
        <p key={index} className="answerOptions">
          {option}
        </p>
      );
    });
    return (
      <div>
        <Levels />
        <ProgressBar />
        <h2>{this.state.question}</h2>
        {question}
        <button className="btnSubmit">Suivant</button>
      </div>
    );
  }
}

export default Quiz;
