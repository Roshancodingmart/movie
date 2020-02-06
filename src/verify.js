import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import "./verify.css";
export default class Verify extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      status:false,
      un:false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      un:false
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    var data = { otp: parseInt(this.state.otp) };
    this.clear();
    await axios.post("http://localhost:3005/verifyOtp", data).then(res=>{
        if(res.data=="successful"){
            this.setState({
                status:true
            })
        }
        if(res.data=="unsuccessful"){
            this.setState({
                un:true
            })
        }
      });

  };
  clear = () => {
    this.setState({
      otp: ""
    });
  };
  render() {
    return (
      <>
        {this.state.status && <Redirect to="/checkPassword" />}
        <form onSubmit={this.handleSubmit} className="verify">
          <TextField
            id="standard-basic"
            label="OTP"
            name="otp"
            value={this.state.otp}
            onChange={this.handleChange}
          />
          {this.state.un && <span className="input_error">*Enter correct OTP</span>}
          <Button type="submit" variant="contained" color="primary">
            Verify OTP
          </Button>

        </form>
      </>
    );
  }
}
