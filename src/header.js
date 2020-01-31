import React, { Component } from "react";
const jwt = require("jsonwebtoken");
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      name:""
    };
  }
  componentWillMount=()=>{
    if(localStorage.getItem("token")){
      
      this.setState({
        show:true,
        name:(jwt.decode(localStorage.getItem("token")).name).toUpperCase()
      })
    }
    else{
      this.setState({
        show:false
      })
    }
  }
  componentWillReceiveProps=()=>{
if(localStorage.getItem("token")){
  this.setState({
    show:true
  })
}
  }


  render() {
    return (
      <>
        <div className="header-main">
        <div className="user">
          {this.state.show && <p>Signed in as {this.state.name}</p>}
        </div>
          <div className="btn-holder">
            {!this.state.show && (
              <button onClick={this.props.signup}>Sign Up</button>
            )}

            {!this.state.show && (
              <button onClick={this.props.signin}>Sign In</button>
            )}

            {this.state.show && (
              <button onClick={this.props.logout}>Log Out</button>
            )}
          </div>
        </div>
      </>
    );
  }
}
