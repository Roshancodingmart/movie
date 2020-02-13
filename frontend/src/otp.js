import React, { Component } from "react";
import { Link,Redirect} from "react-router-dom";
import "./otp.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default class Otp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error:false,
      status:false,
      un:false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error:false,
      un:false
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.email.length>0) {
      var data = { mail: this.state.email };
      this.clear();
     
      await axios.post("http://localhost:3005/otp", data).then(res=>{
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
      this.clear();
    }
    else{
        console.log("error")
        this.setState({
            error:true
        })
    }
  };
  clear = () => {
    this.setState({
      email: ""
    });
  };
  render() {
    return (
      <>
      {this.state.status && <Redirect to="/verifyOtp"/>}
        <form onSubmit={this.handleSubmit} className="otp">
          <TextField
            id="standard-basic"
            label="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          {this.state.error && <span className="input_error">*fill in the email to receive the otp!</span>}
{this.state.un && <span className="input_error">*Invalid email id!</span>}
          <Button type="submit" variant="contained" color="primary">
            Send OTP
          </Button>

        </form>
      </>
    );
  }
}
