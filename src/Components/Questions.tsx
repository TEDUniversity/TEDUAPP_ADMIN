import * as React from "react";
import QuestionInput from "./QuestionInput";

interface IProps {
  questionNumber: number;
  sendSurveyBack(survey): any;
}

export default class Questions extends React.Component<IProps> {
  questionElements = [];
  state = {
    survey: {
      questions: []
    }
  };

  componentWillReceiveProps(newProp: IProps) {
    this.questionElements = [];
    for (let index = 0; index < newProp.questionNumber; index++) {
      this.questionElements.push("pushed");
    }
  }
  addQuestionToSurvey = a => {
    let s = this.state.survey as any;
    if (s.questions) {
      s.questions = [];
    }
    s.questions.push(a);
    this.setState({ survey: s });
    this.props.sendSurveyBack(s);
  };
  takeQuestions = () => {
    return this.questionElements.map((item, id) => {
      return (
        <QuestionInput index={id} sendSurveyBack={this.addQuestionToSurvey} />
      );
    });
  };
  render() {
    return <div>{this.takeQuestions()}</div>;
  }
}
