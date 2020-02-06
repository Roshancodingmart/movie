import React, { Component } from "react";
import SimpleCrypto from "simple-crypto-js";
import cookie from "react-cookies";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "./header.css";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: "",
      nope:false
    };
  }
  componentWillMount = () => {
    if (localStorage.getItem("priority")) {
      var _secretKey = "goodmorningeveryone";
      var simpleCrypto = new SimpleCrypto(_secretKey);
      var token = cookie.load("token");
      console.log("token", token);
      var decipherText = simpleCrypto.decrypt(token);
      // console.log()
      this.setState({
        show: true,
        name: jwt.decode(decipherText).name.toUpperCase()
      });
    } else {
      this.setState({
        show: false
      });
    }
  };
  componentWillReceiveProps = () => {
    if (localStorage.getItem("priority")) {
      this.setState({
        show: true
      });
    }
  };
  triggerLogout = () => {
    localStorage.removeItem("priority");
    cookie.remove("token", { path: "/" });
    this.setState({
      nope:true,
      show:false
    })
    // window.location.reload(false);
  };
  render() {
    return (
      <>
      {this.state.nope && <Redirect to="/signup"/>}
        <div className="header-main">
          <div className="user">
            {this.state.show && (
              <div className="welcome">Welcome {this.state.name}</div>
            )}
          </div>
          <div className="btn-holder">
            {!this.state.show && <Link to="/signup">
              <button>Sign up</button>
            </Link>}

            {!this.state.show && <Link to="/signin">
              <button>Sign In</button>
            </Link>}

            {this.state.show && (
              <button onClick={this.triggerLogout}>Log Out</button>
            )}
          </div>
        </div>
      </>
    );
  }
}
