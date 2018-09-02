import * as React from "react";
import * as types from "../store/types";
import { Dispatch } from "redux";
import * as actions from "../store/actions";
import { connect } from "react-redux";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
  updateLoggedIn?: (loggedIn: boolean) => any;
}

class Login extends React.Component<IProps & ReduxProps> {
  render() {
    const style = {
      alignItems: "center",
      display: "flex",
      height: 300
    };
    return (
      <div className={"container"}>
        <h5 className={"teal-text"}> LOGIN</h5>
        <div className={"card-pannel z-depth-5 teal"}>
          <div className={"container white-text"} style={style}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
            <button
              onClick={() => {
                this.props.updateLoggedIn(true);
              }}
            >
              LOGIN
            </button>
          </div>
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
