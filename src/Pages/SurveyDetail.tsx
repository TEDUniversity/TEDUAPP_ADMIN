import * as React from "react";
import { Link } from "react-router-dom";

interface Iprops {
  news: any;
  location: any;
}
export default class SurveyDetail extends React.Component<Iprops> {
  renderAnswers = ans => {
    return ans.map((item, id) => {
      return (
        <div key={id} style={{ border: "10px black" }}>
          <a className={"white-text"}>
            <h5>{item["text"]}</h5>
          </a>
          <p key={id}>{"Cevap sayısı: " + item["count"]}</p>
        </div>
      );
    });
  };

  renderQuestion = () => {
    return this.props.location.state.news.questions.map((item, id) => {
      return (
        <div key={id} style={{ border: "10px black" }}>
          <h3>{item["question"]}</h3>
          {this.renderAnswers(item.answers)}
          <hr />
        </div>
      );
    });
  };
  render() {
    return (
      <div className={"container "}>
        <h1>{this.props.location.state.news.name}</h1>
        <span style={{ whiteSpace: "pre-line" }}>{this.renderQuestion()}</span>
      </div>
    );
  }
}
