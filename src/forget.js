import React, { Component } from "react";
import "./forget.css";
import axios from "axios"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Forget extends Component {
  constructor() {
    super();
    this.state = {};
  }
  handleOtp = async event => {
    event.preventDefault();
    
    // let data={pass:otp}
    // await axios.post("http://localhost:3005/smsUser",data);
    
  };
  render() {
    return (
      <div className="forget-div">
        <Link to="/otp">Forget password?</Link>
      </div>
    );
  }
}
