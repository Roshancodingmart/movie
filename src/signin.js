import React, { Component } from "react";
import "./signin.css";
import Forget from "./forget";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import SimpleCrypto from "simple-crypto-js";
import cookie from "react-cookies";
const jwt = require("jsonwebtoken");
const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));
export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      no_error: false,
      no_email_error: false,
      pass_error: false,
      show_table: false,
      show_movie: false
    };
  }
  handleChange = event => {
    this.setState({
      no_email_error: false,
      pass_error: false,
      no_error: true
    });
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSignin = async event => {
    event.preventDefault();
    if (this.state.email == "") {
      console.log("no email");
      await this.setState({
        no_email_error: true,
        no_error: false
      });
    }
    if (this.state.password.length <= 0) {
      console.log("no password");
      await this.setState({
        pass_error: true,
        no_error: false
      });
    }
    this.setState(
      {
        user: {
          mail: this.state.email,
          pass: this.state.password
        }
      },
      async () => {
        let a = { mail: this.state.user.mail, pass: this.state.user.pass };
        await axios
          .post("http://localhost:3005/signinUser", a)
          .then(response => {
            var _secretKey = "goodmorningeveryone";

            var simpleCrypto = new SimpleCrypto(_secretKey);
            var chiperText = simpleCrypto.encrypt(response.data.token);
            if (response.data.msg=="Login Successful") {
              var x = document.getElementById("snackbar");
              x.className = "show";
              setTimeout(() => {
                x.className = x.className.replace("show", "");
              }, 3000);
            }
            cookie.save("token", chiperText, { path: "/" });

            if (jwt.decode(response.data.token).email == "roshan@admin") {
              localStorage.setItem("priority", "1");
              this.setState({
                show_table: true,
                show_movie: false
              });
            } else {
              localStorage.setItem("priority", "2");
              this.setState({
                show_table: false,
                show_movie: true
              });
            }
            window.location.reload(false);
          });
      }
    );
    this.clear();
  };
  clear = () => {
    this.setState({
      email: "",
      password: ""
    });
  };
  render() {
    const classes = useStyles;
    return (
      <>
        <div id="snackbar"> Login Successful</div>
        {this.state.show_table && <Redirect to="/table" />}
        {this.state.show_movie && <Redirect to="/movie" />}
        <form
          className={classes.root}
          onSubmit={this.handleSignin}
          className="form-holder"
        >
          <div className="form">
            <div className="header">SIGN IN</div>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={this.state.email}
              className="form-textarea"
              onChange={this.handleChange}
            />

            {this.state.no_email_error && (
              <div className="input_error">*enter your email to proceed!</div>
            )}
            <br />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={this.state.password}
              className="form-textarea"
              onChange={this.handleChange}
            />
            {this.state.pass_error && (
              <div className="input_error">*Enter password to proceed!</div>
            )}
          </div>
          <div className="btn">
            {/* <Link to="/table"> */}
            <Button type="submit" variant="contained" color="primary">
              Sign In
            </Button>
            {/* </Link> */}
          </div>
          <Forget />
          {/* <Route path="/forget" component={Forget}/> */}
        </form>
      </>
    );
  }
}
