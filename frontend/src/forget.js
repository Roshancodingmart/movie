import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./forget.css";

export default class Forget extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="forget-div">
        <Link to="/otp">Forget password?</Link>
      </div>
    );
  }
}
