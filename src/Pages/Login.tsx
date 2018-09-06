import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import * as firebase from "firebase";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  updateLoggedIn?: (loggedIn: boolean) => any;
}

class Login extends React.Component<IProps & ReduxProps> {
  state = {
    userName: "",
    password: "",
    correctUser: "admin",
    correctPass: "123654789"
  };
  componentWillMount() {
    firebase
      .database()
      .ref("/admins")
      .on("value", response => {
        this.setState({
          correctPass: response.val().admin.password,
          correctUser: response.val().admin.username
        });
      });
  }
  loginControl() {}
  render() {
    if (this.props.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <div className={"container loginContainer"}>
        <div className="loginSubContainer">
          <h5> LOGIN </h5>
          <div>
            <p>Kullanıcı adı:</p>
            <input
              onChange={event => {
                this.setState({ userName: event.target.value });
              }}
            />

            <p>Şifre: </p>

            <input
              type="password"
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
          <button
            style={{ marginTop: 20 }}
            onClick={() => {
              if (
                this.state.password === this.state.correctPass &&
                this.state.userName === this.state.correctUser
              ) {
                this.props.updateLoggedIn(true);
              } else {
                alert("Kullanıcı adı veya yanlış");
              }
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateLoggedIn: (loggedIn: boolean) => {
    dispatch(actions.updateLoggedIn(loggedIn));
  }
});

export default connect<{}, {}, ReduxProps>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
