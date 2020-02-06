import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Mail from "./mail"
export default class Check extends Component {
  constructor() {
    super();
    this.state = {
      pass1: "",
      pass2: "",
      error: false,
      status:false,
      un:false
    };
  }
  componentWillMount=async()=>{
    await axios.post("http://localhost:3005/getUser").then(response=>{
        console.log(response.data)
        this.setState({
            mail:response.data
        })
    })
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
      error: false
    });
  };
  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.pass1 == this.state.pass2) {
      var data = { password: this.state.pass1 };
      this.clear();
      await axios.post("http://localhost:3005/changePassword", data).then(response=>{
        if(response.data=="successful"){
            this.setState({
                status:true
            })
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
      
        <form className="otp" onSubmit={this.handleSubmit}>
          <span style={{ fontSize: "20px" }}>{this.state.mail}</span>
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
        
        {this.state.status && <Mail/>}
        
      </>
    );
  }
}
