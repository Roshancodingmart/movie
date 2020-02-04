import React, { Component } from "react";
import SimpleCrypto from "simple-crypto-js";
import cookie from 'react-cookies'
import "./header.css";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name: ""
    };
  }
  componentWillMount = () => {
    if (localStorage.getItem("priority")) {
      var _secretKey = "goodmorningeveryone";
      var simpleCrypto = new SimpleCrypto(_secretKey);
      var token = cookie.load("token");
      console.log("token",token)
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

  render() {
    return (
      <>
        <div className="header-main">
          <div className="user">
            {this.state.show && (
              <div className="welcome">Welcome {this.state.name}</div>
            )}
          </div>
          <div className="btn-holder">
            {!this.state.show && (
              <button onClick={this.props.signup}>Sign Up</button>
            )}

            {!this.state.show && (
              <button onClick={this.props.signin}>Sign In</button>
            )}

            {this.state.show && (
              <button onClick={this.props.logout}>Log Out</button>
            )}
          </div>
        </div>
      </>
    );
  }
}
