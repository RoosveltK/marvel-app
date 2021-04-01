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
    btnActive: true,
    userResponse: null,
    score: 0,
  };

  completQuiz = React.createRef();

  loadQuestion = (quizz) => {
    const datas = QuizMarvel[0].quizz[quizz];
    if (datas.length >= this.state.maxQuestion) {
      this.completQuiz.current = datas;
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
    if (this.state.idQuestion !== prevState.idQuestion) {
      this.setState({
        question: this.state.saveQuestion[this.state.idQuestion].question,
        options: this.state.saveQuestion[this.state.idQuestion].options,
        btnActive: true,
        userResponse: null,
      });
    }
  }
  handleAnswer = (resp) => {
    this.setState({
      userResponse: resp,
      btnActive: false,
    });
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestion - 1) {
      //END
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }
    const correctQuestion = this.completQuiz.current[this.state.idQuestion]
      .answer;
    //Verif du score
    if (this.state.userResponse === correctQuestion) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));
    }
  };
  render() {
    const question = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          className={`answerOptions ${
            this.state.userResponse === option ? "selected" : null
          }`}
          onClick={() => this.handleAnswer(option)}
        >
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
        <button
          disabled={this.state.btnActive}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          Suivant
        </button>
      </div>
    );
  }
}

export default Quiz;
