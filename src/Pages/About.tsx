import * as React from "react";
import * as types from "../store/types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";
import Login from "./Login";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}
class About extends React.Component<IProps & ReduxProps> {
  render() {
    const style = {
      alignItems: "center",
      display: "flex",
      height: 300
    };
    if (this.props.isLoggedIn) {
      return (
        <div className={"container"}>
          <h5 className={"teal-text"}> About Us</h5>
          <div className={"card-pannel z-depth-5 teal"}>
            <div className={"container white-text"} style={style}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum
              </p>
            </div>
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

export default connect<{}, {}, ReduxProps>(mapStateToProps)(About);
