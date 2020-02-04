import React, { Component } from "react";
import Header from "./header";
import Signup from "./signup";
import Signin from "./signin";
import Table from "./table";
import Movie from "./movie";
import "./App.css";
import cookie from "react-cookies";
// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showSignup: true,
      showSignin: false,
      showTable: false,
      show: 0
    };
  }

  componentWillMount = () => {
    if (localStorage.getItem("priority")) {
      if (localStorage.getItem("priority") == "1") {
        this.setState({
          showTable: true
        });
      } else {
        this.setState({
          showTable: false
        });
      }
    }
  };

  triggerSignup = () => {
    this.setState({
      ...this.state,
      showSignup: true,
      showSignin: false
    });
  };
  triggerSignin = () => {
    this.setState({
      ...this.state,
      showSignup: false,
      showSignin: true
    });
  };
  triggerLogout = () => {
    localStorage.removeItem("priority");
    cookie.remove("token", { path: "/" });
    window.location.reload(false);
  };
  triggerDelete = () => {
    // alert("Inside trigger delete");
    this.setState({
      show: 1
    });
  };
  render() {
    return (
      <>
        <Header
          signup={this.triggerSignup}
          signin={this.triggerSignin}
          logout={this.triggerLogout}
        />
        {!localStorage.getItem("priority") && (
          <div className="main">
            {this.state.showSignup && <Signup />}
            {this.state.showSignin && <Signin />}
          </div>
        )}
        {this.state.showTable && (
          <Table delete={this.triggerDelete} show={this.state.show} />
        )}
        {!this.state.showTable && localStorage.getItem("priority") && <Movie />}
      </>
    );
  }
}
