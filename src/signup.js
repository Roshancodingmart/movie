import React, { Component } from "react";
import "./signup.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));
export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      space_error: false,
      syntax_error: false,
      no_username_error: false,
      no_email_error: false,
      pass_error: false,
      user: {
        mail: "",
        name: "",
        pass: ""
      },
      alert: false,
      no_error: true
    };
  }

  handleChange = event => {
    console.log("hi")
    this.setState({
      no_email_error: false,
      no_username_error: false,
      pass_error: false,
      syntax_error: false,
      no_error: true
    });
    if (
      event.target.name == "email" &&
      event.target.value.replace(/\s/g, "").length != event.target.value.length
    ) {
      this.setState({
        space_error: true
      });

      console.log("space not allowed");
    } else {
      this.setState({
        space_error: false
      });
    }
    if(event.target.value.replace(/\s/g, "").length!=event.target.value.length){
      console.log("error")
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSignup = async event => {
    event.preventDefault();
    if (this.state.email == "") {
      console.log("no email");
      await this.setState({
        no_email_error: true,
        no_error: false
      });
    }
    if (
      this.state.username == "" ||
      this.state.username.replace(/\s/g, "").length <= 0
    ) {
      console.log("no username");
      await this.setState({
        no_username_error: true,
        no_error: false
      });
    }
    if (this.state.password.length < 6) {
      console.log("no password");
      await this.setState({
        pass_error: true,
        no_error: false
      });
    }
    if (!this.state.email.includes(".com") && !this.state.email.includes("@")) {
      await this.setState({
        syntax_error: true,
        no_error: false
      });
    }
    if (this.state.no_error) {
      this.setState(
        {
          no_email_error: false,
          no_username_error: false,
          pass_error: false,
          syntax_error: false,
          user: {
            mail: this.state.email,
            name: this.state.username,
            pass: this.state.password
          },
          alert: false
        },
        async () => {
          let a = {
            mail: this.state.user.mail,
            name: this.state.user.name,
            pass: this.state.user.pass
          };
          await axios
            .post("http://localhost:3005/createUser", a)
            .then(response => {
              alert(response.data);
            });
        }
      );
      this.clear();
    }
  };
  clear = () => {
    this.setState({
      email: "",
      username: "",
      password: ""
    });
  };
  render() {
    const classes = useStyles;

    return (
      <>
        <form
          className={classes.root}
          // onSubmit={this.handleSignup}
          className="form-holder"
        >
          <div className="form">
            <div className="header">SIGN UP</div>
            <TextField
              className="form-textarea"
              label="Email"
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            {this.state.no_email_error && (
              <div className="input_error">*enter your email to proceed!</div>
            )}
            {!this.state.no_email_error && this.state.syntax_error && (
              <div className="input_error">*invalid syntax e.g:@gmail.com</div>
            )}
            {this.state.space_error && (
              <div className="input_error">*space not allowed</div>
            )}
            <br />
            
            <TextField
              className="form-textarea"
              label="Username"
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            {this.state.no_username_error && (
              <div className="input_error">*Enter user name to proceed!</div>
            )}
            <br />
            <TextField
              className="form-textarea"
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            {this.state.pass_error && (
              <div className="input_error">*Enter atleast 6 characters</div>
            )}
          </div>

          <div className="btn">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={this.handleSignup}
            >
              Sign Up
            </Button>
          </div>
        </form>
      </>
    );
  }
}
