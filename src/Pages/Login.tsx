import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  updateLoggedIn?: (loggedIn: boolean) => any;
}

class Login extends React.Component<IProps & ReduxProps> {
  state = {
    userName: "",
    password: ""
  };
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
              onChange={event => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
          <button
            style={{ marginTop: 20 }}
            onClick={() => {
              if (
                this.state.password === "admin" &&
                this.state.userName === "admin"
              ) {
                this.props.updateLoggedIn(true);
              } else {
                alert("Şifre yanlış");
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
