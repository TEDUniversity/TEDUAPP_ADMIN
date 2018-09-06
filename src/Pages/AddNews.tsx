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
    type: "",
    newsArray: []
  };

  handleSubmit = event => {
    if (
      this.state.news === "" ||
      this.state.title === "" ||
      this.state.tarih === "" ||
      this.state.yazar === "" ||
      this.state.type === ""
    ) {
      alert("Lütfen boş alan bırakma");
      return;
    }
    firebase
      .database()
      .ref("councilNews")
      .push({
        author: this.state.yazar,
        content: this.state.news,
        date: this.state.tarih,
        header: this.state.title,
        type: this.state.type,
        links: [{ url: "" }]
      });
    this.setState({ news: "", title: "", tarih: "", yazar: "", type: "" });
    event.preventDefault();
  };
  componentWillMount() {
    firebase
      .database()
      .ref("/councilNews")
      .on("value", response => {
        let arr = [];
        response.forEach(child => {
          arr.push(child.val());
          this.setState({ newsArray: arr });
        });
      });
  }

  renderNews = () => {
    if (this.state.newsArray.length <= 10) {
      return this.state.newsArray.map((item, id) => {
        return (
          <div key={id} style={{ border: "10px black" }}>
            <Link to={{ pathname: "/detailNews", state: { news: item } }}>
              <h3 className={"white-text"}>{item["header"]}</h3>
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
              <h3 className={"white-text"}>{item["header"]}</h3>
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
                    value={this.state.title}
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
                    value={this.state.news}
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
                    value={this.state.tarih}
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
                    value={this.state.yazar}
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ yazar: e.target.value });
                    }}
                  />
                </label>
              </div>
              <div style={{ flex: 1, margin: 10 }}>
                <label>
                  Haber tipi:
                  <input
                    value={this.state.type}
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ type: e.target.value });
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
