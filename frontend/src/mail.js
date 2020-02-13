import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

export default class Mail extends Component {
  constructor(props) {
    super(props);
    {
      this.state = {
        status: false
      };
    }
  }
  componentWillMount = async () => {
    await axios.post("http://localhost:3005/mailUser").then(res => {
      this.setState({
        status: true
      });
    });
  };

  render() {
    return <>{this.state.status && <Redirect to="/signup" />}</>;
  }
}
