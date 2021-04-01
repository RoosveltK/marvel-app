import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "react-toastify/dist/ReactToastify.min.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel/";
import QuizOver from "../QuizOver";

toast.configure();
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
    welcomeMsg: false,
    quizPartEnd: false,
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
    if (this.props.userData.pseudo) {
      this.welcomeMsg(this.props.userData.pseudo);
    }
  }

  handleAnswer = (resp) => {
    this.setState({
      userResponse: resp,
      btnActive: false,
    });
  };

  welcomeMsg = (user) => {
    if (this.state.welcomeMsg === false) {
      this.setState({
        welcomeMsg: true,
      });
      toast.warn(` Welcome ❕ ${user}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestion - 1) {
      this.levelOver();
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
      toast.success(` Bravo ✌  +1`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: "toastify-color",
      });
    } else {
      toast.error(` Raté 0 😥 `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        bodyClassName: "toastify-color",
      });
    }
  };

  levelOver = () => {
    this.setState({ quizPartEnd: true });
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
    return !this.state.quizPartEnd ? (
      <QuizOver ref={this.completQuiz} />
    ) : (
      <div>
        <Levels />
        <ProgressBar id={this.state.idQuestion} max={this.state.maxQuestion} />
        <h2>{this.state.question}</h2>
        {question}
        <button
          disabled={this.state.btnActive}
          onClick={this.nextQuestion}
          className="btnSubmit"
        >
          {this.state.idQuestion < this.state.maxQuestion - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </div>
    );
  }
}

export default Quiz;
