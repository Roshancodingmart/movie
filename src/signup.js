import React, { Component } from "react";
import axios from 'axios'
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      user: {
        mail: "",
        name: "",
        pass: ""
      },
      alert:false
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSignup = event => {
    event.preventDefault();
    if(this.state.email.length!="" && this.state.username.length!="" && this.state.password.length!="")
    {this.setState(
      {
        user: {
          mail: this.state.email,
          name: this.state.username,
          pass: this.state.password
        },
        alert:false
      },
      async () => {
        let a = { mail: this.state.user.mail,
        name:this.state.user.name,
      pass:this.state.user.pass };
        await axios.post("http://localhost:3005/createUser", a).then(response=>{
          alert(response.data)
        });
      }
    )
    this.clear();
  }
  else{
    this.setState({
      alert:true
    })
  }
  };
  clear=()=>{
    this.setState({
      email: "",
      username: "",
      password: ""
    })
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSignup} className="form-holder">
          <div className="form">
            <h3>SIGN UP</h3>
            <input
              className="input"
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Enter Your Email"
              onChange={this.handleChange}
            />
            <input
              className="input"
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Enter Your Name"
              onChange={this.handleChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter Your Password"
              onChange={this.handleChange}
            />
            
          </div>
          {this.state.alert && <div className="alert">
            <p>*Fill every column to proceed</p>
          </div>}
          <div className="btn">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </>
    );
  }
}
