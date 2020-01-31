import React, { Component } from "react";
import axios from 'axios'
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:""
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSignin = event => {
    event.preventDefault();
    this.setState({
      user: {
        mail: this.state.email,
        pass: this.state.password
      }
    },async ()=>{
      let a = { mail: this.state.user.mail,
      pass:this.state.user.pass};
        await axios.post("http://localhost:3005/signinUser", a).then(response=>{
          alert(response.data.msg)
          console.log(response.data.token)
          localStorage.setItem("token",response.data.token)
          window.location.reload(false);
        })
    });
    this.clear();

  };
  clear=()=>{
    this.setState({
      email:"",
      password:""
    })
  }
  render() {
    return (
      <>
        <form onSubmit={this.handleSignin} className="form-holder">
          <div className="form">
            <h3>SIGN IN</h3>
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
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Enter Your Password"
              onChange={this.handleChange}
            />
          </div>
          <div className="btn">
            <input
              type="submit"
              value="Sign In"
              //   onClick={this.state.viewUser}
            />
          </div>
        </form>
      </>
    );
  }
}
