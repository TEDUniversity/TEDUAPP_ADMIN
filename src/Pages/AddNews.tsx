import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import Login from "./Login";
import * as firebase from "firebase";
import { Link } from "react-router-dom";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddNews extends React.Component<IProps & ReduxProps> {
  state = {
    news: "",
    title: "",
    tarih: "",
    yazar: "",
    newsArray: []
  };

  handleSubmit = event => {
    alert("An essay was submitted: " + this.state.news);
    event.preventDefault();
  };
  componentDidMount() {
    firebase
      .database()
      .ref("/councilNews")
      .on("value", response => {
        console.log(JSON.stringify(response.val()));
        this.setState({ newsArray: response.val() });
      });
  }

  renderNews = () => {
    if (this.state.newsArray.length <= 10) {
      return this.state.newsArray.map((item, id) => {
        return (
          <div key={id} style={{ border: "10px black" }}>
            <Link to={{ pathname: "/detailNews", state: { news: item } }}>
              <a className={"white-text"}>
                <h3>{item["header"]}</h3>
              </a>
            </Link>
            <p key={id}>
              {"" + item["content"].substr(0, 30)}
              ...
            </p>
            <hr />
          </div>
        );
      });
    } else {
      let arr = this.state.newsArray.slice(
        this.state.newsArray.length - 10,
        this.state.newsArray.length
      );
      return arr.map((item, id) => {
        return (
          <div key={id}>
            <Link to={{ pathname: "/detailNews", state: { news: item } }}>
              <a className={"white-text"}>
                <h3>{item["header"]}</h3>
              </a>
            </Link>
            <p key={id}>
              {"" + item["content"].substr(0, 30)}
              ...
            </p>
            <hr />
          </div>
        );
      });
    }
  };
  render() {
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h1 className={"teal-text"}> Haberler</h1>
          {this.renderNews()}
          <h1 className={"teal-text"}> Haber ekle</h1>
          <div className={"card-pannel z-depth-5 teal"}>
            <form onSubmit={this.handleSubmit}>
              <div style={{ flex: 1, margin: 10 }}>
                <label>
                  Başlık:
                  <input
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ title: e.target.value });
                    }}
                  />
                </label>
              </div>

              <label>
                <div style={{ flex: 1, margin: 10 }}>
                  <p> Haber:</p>
                  <textarea
                    style={{ height: 300, width: 900 }}
                    onChange={e => {
                      this.setState({ news: e.target.value });
                    }}
                  />
                </div>
              </label>
              <div style={{ flex: 1, margin: 10 }}>
                <label>
                  Tarih:
                  <input
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ tarih: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <label>
                  Yazar:
                  <input
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ yazar: e.target.value });
                    }}
                  />
                </label>
              </div>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddNews);
