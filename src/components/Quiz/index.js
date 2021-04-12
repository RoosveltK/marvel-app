import React, { Component } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../quizMarvel/";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

toast.configure();
class Quiz extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
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
    this.state = this.initialState;
    this.completQuiz = React.createRef();
  }

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
    if (
      this.state.saveQuestion !== prevState.saveQuestion &&
      this.state.saveQuestion.length
    ) {
      this.setState({
        question: this.state.saveQuestion[this.state.idQuestion].question,
        options: this.state.saveQuestion[this.state.idQuestion].options,
      });
    }
    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.saveQuestion.length
    ) {
      this.setState({
        question: this.state.saveQuestion[this.state.idQuestion].question,
        options: this.state.saveQuestion[this.state.idQuestion].options,
        btnActive: true,
        userResponse: null,
      });
    }

    if (this.state.quizPartEnd !== prevState.quizPartEnd) {
      const pourcent = this.getPourcentage(
        this.state.maxQuestion,
        this.state.score
      );
      this.levelOver(pourcent);
    }
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
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
      this.setState({
        quizPartEnd: true,
      });
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

  getPourcentage = (maxquestion, score) => (score / maxquestion) * 100;

  levelOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent,
      });
    } else {
      this.setState({ percent });
    }
  };
  loadNextLevel = (param) => {
    this.setState({ ...this.initialState, quizLevel: param });
    this.loadQuestion(this.state.levelType[param]);
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
          <FaChevronRight /> {option}
        </p>
      );
    });
    return this.state.quizPartEnd ? (
      <QuizOver
        ref={this.completQuiz}
        levelNames={this.state.levelType}
        score={this.state.score}
        maxQuestion={this.state.maxQuestion}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadNextLevel={this.loadNextLevel}
      />
    ) : (
      <div>
        <Levels
          levelNames={this.state.levelType}
          quizLevel={this.state.quizLevel}
        />
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
