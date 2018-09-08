import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import Login from "./Login";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddNotification extends React.Component<IProps & ReduxProps> {
  state = {
    content: "",
    title: "",
    tarih: "",
    sender: "",
    newsArray: []
  };

  handleSubmit = event => {
    if (
      this.state.content === "" ||
      this.state.title === "" ||
      this.state.tarih === "" ||
      this.state.sender === ""
    ) {
      alert("Lütfen boş alan bırakma");
      return;
    }

    confirmAlert({
      title: "EMİN MİSİN?",
      message:
        '"' +
        this.state.content +
        '" Bildirimi göndermek istediğine emin misin?',
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            firebase
              .database()
              .ref("/notifications")
              .push({
                sender: this.state.sender,
                content: this.state.content,
                date: this.state.tarih,
                header: this.state.title
              });
            this.setState({ content: "", title: "", tarih: "", sender: "" });
            event.preventDefault();
          }
        },
        {
          label: "Hayır",
          onClick: () => {
            return;
          }
        }
      ]
    });
  };
  componentWillMount() {
    firebase
      .database()
      .ref("/notifications")
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
          <div key={id}>
            <h3>{item["header"]}</h3>

            <p key={id}>{"" + item["content"]}</p>
            <p>{item["date"]}</p>
            <p>{item["sender"]}</p>
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
            <h3>{item["header"]}</h3>
            <p key={id}>{"" + item["content"]}</p>
            <p>{item["date"]}</p>
            <p>{item["sender"]}</p>
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
          <h1 className={"teal-text"}> Gönderilmiş Bildirimler</h1>
          {this.renderNews()}
          <h1 className={"teal-text"}> Bildirim ekle</h1>
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
                  <p> Bildirim:</p>
                  <textarea
                    value={this.state.content}
                    style={{ height: 300, width: 900 }}
                    onChange={e => {
                      this.setState({ content: e.target.value });
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
                  Gönderen:
                  <input
                    value={this.state.sender}
                    style={{ marginLeft: 20 }}
                    onChange={e => {
                      this.setState({ sender: e.target.value });
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(AddNotification);
