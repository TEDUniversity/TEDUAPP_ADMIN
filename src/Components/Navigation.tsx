import * as React from "react";
import { Link } from "react-router-dom";
import * as types from "../store/types";
import { connect } from "react-redux";
// import Home from "./Home";
// import About from "./About";

interface IProps {}
interface ReduxProps {
  isLoggedIn?: boolean;
}

class Navigation extends React.Component<IProps & ReduxProps> {
  render() {
    if (this.props.isLoggedIn) {
      return (
        <nav className={"deep-purple darken-1"}>
          <div className="header">
            <Link to={"/"}>
              <a className={"white-text"}>
                <img src="https://www.tedu.edu.tr/sites/default/files/logo_tr_1.png" />
              </a>
            </Link>
            <div className="header-right">
              <Link to={"/"}>
                <a className={"white-text"}>Home</a>
              </Link>
              <Link to={"/addnews"}>
                <a className={"white-text"}>Haber ekle</a>
              </Link>
              <Link to={"/notifications"}>
                <a className={"white-text"}>Bildirim ekle</a>
              </Link>
              <Link to={"/surveys"}>
                <a className={"white-text"}>Anket ekle</a>
              </Link>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className={"deep-purple darken-1"}>
          <div className="header">
            <Link to={"/"}>
              <a className={"white-text"}>
                <img src="https://www.tedu.edu.tr/sites/default/files/logo_tr_1.png" />
              </a>
            </Link>
            <div className="header-right">
              <Link to={"/"}>
                <a className={"white-text"}>Home</a>
              </Link>
              <Link to={"/login"}>
                <a className={"white-text"}>Log In</a>
              </Link>
            </div>
          </div>
        </nav>
      );
    }
  }
}
const mapStateToProps = (state: types.GlobalState) => ({
  isLoggedIn: state.loggedIn
});

export default connect<{}, {}, ReduxProps>(mapStateToProps)(Navigation);
