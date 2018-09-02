import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import Login from "./Login";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class AddNews extends React.Component<IProps & ReduxProps> {
  state: {
    news: "";
    title: "";
    tarih: "";
    yazar: "";
  };

  handleSubmit = event => {
    alert("An essay was submitted: " + this.state.news);
    event.preventDefault();
  };
  render() {
    const style = {
      alignItems: "center",
      display: "flex",
      height: 300
    };
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h5 className={"teal-text"}> Haber ekle</h5>
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
