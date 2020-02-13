import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  draggable: true
});

export default class Check extends Component {
  constructor() {
    super();
    this.state = {
      pass1: "",
      pass2: "",
      error: false,
      status: false,
      expire: false
    };
  }
  componentWillMount = async () => {
    var link = window.location.href;
    var key = link.replace("http://localhost:3000/changePassword", "");
    var data = { url: key };
    await axios
      .post("http://localhost:3005/checkLink", data)
      .then(response => {
        if (response.data == "unsuccessful") {
          this.setState({
            expire: true
          });
        }
      });
  };

  notify = () => {
    toast("Password changed Successfully", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: false
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    var link = window.location.href;
    var key = link.replace("http://localhost:3000/changePassword", "");
    if (this.state.pass1 == this.state.pass2) {
      var data = { password: this.state.pass1 , url:key};
      this.clear();
      await axios
        .post("http://localhost:3005/resetPassword", data)
        .then(response => {
          if (response.data == "successful") {
            this.notify();
            this.setState({
              status: true
            });
          }
        });
      this.clear();
    } else {
      this.setState({
        error: true
      });
    }
  };
  clear = () => {
    this.setState({
      pass1: "",
      pass2: ""
    });
  };
  render() {
    return (
      <>
        {this.state.expire && <Redirect to="/expire" />}
        {this.state.status && <Redirect to="/signin" />}
        <form className="otp" onSubmit={this.handleSubmit}>
          {/* <TextField
            type="text"
            id="standard-basic"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          /> */}
          <TextField
            type="password"
            id="standard-basic"
            label="New-password"
            name="pass1"
            value={this.state.pass1}
            onChange={this.handleChange}
          />
          <TextField
            type="password"
            id="standard-basic"
            label="Retype-password"
            name="pass2"
            value={this.state.pass2}
            onChange={this.handleChange}
          />
          {this.state.error && (
            <span className="input_error">
              *both the password should be same!
            </span>
          )}

          <Button type="submit" variant="contained" color="primary">
            Reset
          </Button>
        </form>
      </>
    );
  }
}
