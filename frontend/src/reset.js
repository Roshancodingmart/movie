import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Reset extends Component {
  render() {
    return <div className="forget-div">
    <Link to="/send">reset password</Link>
    </div>;
  }
}
