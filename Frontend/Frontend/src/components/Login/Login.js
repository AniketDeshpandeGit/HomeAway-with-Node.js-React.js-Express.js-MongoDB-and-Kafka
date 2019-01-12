import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import { Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createBook } from "../../actions";

import { loginDetails } from "../../actions";

//Define a Login Component
class Login extends Component {
  constructor(props) {
    console.log("Inside Login");

    super(props);

    this.state = {
      owner: [],
      username: "",
      password: "",
      authFlag: false,
      errors: {},
      redirect: false,
      profile: ""
    };
    //Bind the handlers to this class
    this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  //Call the Will Mount to set the auth Flag to false
  componentWillMount() {
    this.setState({
      authFlag: false
    });
  }
  //username change handler to update state variable with the text entered by the user
  usernameChangeHandler = e => {
    this.setState({
      username: e.target.value
    });
  };
  //password change handler to update state variable with the text entered by the user
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  renderField(field) {
    const {
      meta: { touched, error }
    } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  //submit Login handler to send a request to the node backend
  submitLogin = e => {
    console.log("Inside Login Post");
    var headers = new Headers();
    //prevent page from refresh
    e.preventDefault();

    if (!this.handleValidation()) {
      alert("Form has errors.");
    }

    const data = {
      username: this.state.username,
      password: this.state.password
    };
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://18.225.5.238/loginOwner", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });

        const tempOwner = this.state.owner.concat(response.data);

        console.log("tempOwner " + tempOwner[0]._id);

        this.setState({
          owner: tempOwner[0]._id
        });

        console.log("response.data " + JSON.stringify(response.data));

        console.log("Owner " + this.state.owner);

        const dataDashboard = {
          username: this.state.username,
          password: this.state.password,
          ownerID: this.state.owner
        };

        this.setState({
          redirect: true,
          profile: dataDashboard
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  handleValidation() {
    //let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (this.state.username === "") {
      formIsValid = false;
      errors["username"] = "Username Cannot be empty";
    }

    if (this.state.password === "") {
      formIsValid = false;
      errors["password"] = "Password Cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    //redirect based on successful login
    // let redirectVar = null;
    // if (cookie.load("cookie")) {
    //   console.log("Got Cookie");
    //   redirectVar = <Redirect to="/OwnerDashboard" />;
    // }

    const { redirect, profile } = this.state;

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/OwnerDashboard",
            state: { referrer: this.state.profile }
          }}
        />
      );

    return (
      <div>
        {/* {redirectVar} */}
        <div class="container">
          <div class="login-form">
            <div class="main-div">
              <div class="panel">
                <h2>Owner Login</h2>
                <p>Please enter your username and password</p>
              </div>

              <div class="form-group">
                {/* <input
                  onChange={this.usernameChangeHandler}
                  type="text"
                  class="form-control"
                  name="username"
                  placeholder="Username"
                  required
                /> */}
                <Field
                  label="Username"
                  name="username"
                  component={this.renderField}
                  onChange={this.usernameChangeHandler}
                />
              </div>
              <span style={{ color: "red" }}>
                {this.state.errors["username"]}
              </span>
              <br />
              <div class="form-group">
                {/* <input
                  onChange={this.passwordChangeHandler}
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Password"
                  required
                /> */}
                <Field
                  label="Password"
                  name="password"
                  component={this.renderField}
                  onChange={this.passwordChangeHandler}
                />
              </div>

              <span style={{ color: "red" }}>
                {this.state.errors["password"]}
              </span>
              <br />
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={this.submitLogin}
                //class="btn btn-primary"
              >
                Login
              </Button> */}
              <Button
                onClick={this.submitLogin}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default Login;

export default reduxForm({
  destroyOnUnmount: false,
  form: "NewOwner"
})(
  connect(
    null,
    { loginDetails }
  )(Login)
);
