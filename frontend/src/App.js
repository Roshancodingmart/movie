import React, { Component } from "react";
import Header from "./header";
import Signup from "./signup";
import Signin from "./signin";
import Table from "./table";
import Movie from "./movie";
import Otp from "./otp";
import Verify from "./verify";
import Check from "./check";
import Send from "./send";
import Change from "./change";
import Info from "./info";
import Expire from "./expire";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import cookie from "react-cookies";
import "./App.css";

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
    // window.location.reload(false);
  };
  triggerDelete = () => {
    this.setState({
      show: 1
    });
  };
  render() {
    return (
      <>
        <Router>
          <Header />

          <Route exact path="/" component={Signup} />

          <div className="main">
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </div>
          <Route path="/movie" component={Movie} />
          <Route path="/table" component={Table} />
          <Route path="/otp" component={Otp} />
          <Route path="/verifyOtp" component={Verify} />
          <Route path="/checkPassword" component={Check} />
          <Route path="/send" component={Send} />
          <Route path="/changePassword" component={Change} />
          <Route path="/info" component={Info} />
          <Route path="/expire" component={Expire}/>
        </Router>
      </>
    );
  }
}
