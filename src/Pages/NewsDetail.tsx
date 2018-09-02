import * as React from "react";

interface Iprops {
  news: any;
  location: any;
}
export default class NewsDetail extends React.Component<Iprops> {
  render() {
    console.log(this.props.location.state.news.content);

    return (
      <div className={"container "}>
        <h1>{this.props.location.state.news.header}</h1>
        <span style={{ whiteSpace: "pre-line" }}>
          {" "}
          {this.props.location.state.news.content}
        </span>
        <p>{this.props.location.state.news.author}</p>
        <p>{this.props.location.state.news.date}</p>
        <p>{this.props.location.state.news.type}</p>
      </div>
    );
  }
}
