import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Redirect} from "react-router-dom"

export default class Send extends Component {
  constructor() {
    super();
    this.state = {
        error: false,
      un: false,
      state:false,
      in:false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: false,
      un: false
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.email!=null && this.state.email.length > 0 ) {
      var data = { mail: this.state.email };
      this.clear();
      this.setState({
        in:true
      })
      await axios.post("http://localhost:3005/sendMail", data).then(res => {
        if (res.data == "sent") {
          this.setState({
            status: true,
            
          });
        }
        if (res.data == "unsuccessful") {
          this.setState({
            un: true,
            in:false
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
      email: ""
    });
  };
  render() {
    return (
      <div>
      {this.state.status && <Redirect to="/info"/>}
        <form onSubmit={this.handleSubmit} className="otp">
          <TextField
            id="standard-basic"
            label="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          {this.state.error && (
            <span className="input_error">
              *fill in the email to receive the reset link!
            </span>
          )}
          {this.state.un && (
            <span className="input_error">*Invalid email id!</span>
          )}
          {this.state.in && (
            <span className="green">Wait few seconds for the mail to be send!</span>
          )}
          <Button type="submit" variant="contained" color="primary">
            Request link
          </Button>
        </form>
      </div>
    );
  }
}
