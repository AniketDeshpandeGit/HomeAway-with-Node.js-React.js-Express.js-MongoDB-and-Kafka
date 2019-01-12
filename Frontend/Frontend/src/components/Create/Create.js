import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Create extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstNameOwner: "",
      emailIDOwner: "",
      phoneNumberOwner: "",
      lastNameOwner: "",
      passwordOwner: "",
      addressOwner: "",
      bedrooms: "",
      bathrooms: "",
      errors: {}
    };
    //Bind the handlers to this class
    this.firstNameOwnerChangeHandler = this.firstNameOwnerChangeHandler.bind(
      this
    );
    this.emailIDOwnerChangeHandler = this.emailIDOwnerChangeHandler.bind(this);
    this.phoneNumberOwnerChangeHandler = this.phoneNumberOwnerChangeHandler.bind(
      this
    );
    this.submitCreate = this.submitCreate.bind(this);
  }

  firstNameOwnerChangeHandler = e => {
    this.setState({
      firstNameOwner: e.target.value
    });
  };

  lastNameOwnerChangeHandler = e => {
    this.setState({
      lastNameOwner: e.target.value
    });
  };

  passwordOwnerChangeHandler = e => {
    this.setState({
      passwordOwner: e.target.value
    });
  };

  addressOwnerChangeHandler = e => {
    this.setState({
      addressOwner: e.target.value
    });
  };

  bedroomsChangeHandler = e => {
    this.setState({
      bedrooms: e.target.value
    });
  };

  bathroomsChangeHandler = e => {
    this.setState({
      bathrooms: e.target.value
    });
  };

  emailIDOwnerChangeHandler = e => {
    this.setState({
      emailIDOwner: e.target.value
    });
  };

  phoneNumberOwnerChangeHandler = e => {
    this.setState({
      phoneNumberOwner: e.target.value
    });
  };

  submitCreate = e => {
    //prevent page from refresh
    e.preventDefault();
    if (!this.handleValidation()) {
      alert("Form has errors.");
    } else {
      const data = {
        username: this.state.firstNameOwner,
        lastNameOwner: this.state.lastNameOwner,
        emailIDOwner: this.state.emailIDOwner,
        phoneNumberOwner: this.state.phoneNumberOwner,
        password: this.state.passwordOwner,
        addressOwner: this.state.addressOwner
        // bedrooms: this.state.bedrooms,
        // bathrooms: this.state.bathrooms
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios.post("http://18.225.5.238/createOwner", data).then(response => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("Owner Added: " + data);
          return (window.location.href = "/welcomeOwner");
        }
      });
    }
  };

  handleValidation() {
    //let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    var emailIDOwnerRegEx = /\S+@\S+\.\S+/;
    var phoneNumberOwnerRegEx = /^\+[1-9]{1}[0-9]{3,14}$/;

    if (
      this.state.firstNameOwner === "" ||
      this.state.firstNameOwner.length < 2
    ) {
      console.log("Less than 2");
      formIsValid = false;
      errors["firstNameOwners"] =
        "First Name Cannot be empty or of less than 2 characters";
    }

    if (
      this.state.passwordOwner === "" ||
      this.state.passwordOwner.length < 4
    ) {
      console.log(
        "Less than 2: " + this.state.passwordOwner + " name, length: "
      );
      formIsValid = false;
      errors["passwordOwner"] =
        "Last Name Cannot be empty or of less than 4 characters";
    }

    if (
      this.state.lastNameOwner === "" ||
      this.state.lastNameOwner.length < 2
    ) {
      console.log(
        "Less than 2: " + this.state.lastNameOwner + " name, length: "
      );
      formIsValid = false;
      errors["lastNameOwner"] =
        "Last Name Cannot be empty or of less than 2 characters";
    }

    if (
      this.state.emailIDOwner === "" ||
      !emailIDOwnerRegEx.test(this.state.emailIDOwner)
    ) {
      formIsValid = false;
      errors["emailIDOwner"] = "Invalid Email ID";
    }

    if (
      this.state.phoneNumberOwner === "" ||
      !phoneNumberOwnerRegEx.test(this.state.phoneNumberOwner)
    ) {
      formIsValid = false;
      errors["phoneNumberOwner"] = "Phone Number Invalid";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }

    return (
      <div>
        <br />
        <div class="container">
          <form>
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.firstNameOwnerChangeHandler}
                type="text"
                class="form-control"
                name="firstNameOwner"
                placeholder="First Name"
                minLength="2"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["firstNameOwners"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.lastNameOwnerChangeHandler}
                type="text"
                class="form-control"
                name="lastNameOwner"
                placeholder="Last Name"
                minLength="2"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["lastNameOwner"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.emailIDOwnerChangeHandler}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                name="emailIDOwner"
                placeholder="Email"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["emailIDOwner"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.phoneNumberOwnerChangeHandler}
                type="text"
                class="form-control"
                name="phoneNumberOwner"
                placeholder="Phone Number"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["phoneNumberOwner"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.addressOwnerChangeHandler}
                type="text"
                class="form-control"
                name="addressOwner"
                placeholder="Address"
                maxLength="40"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["addressOwner"]}
            </span>
            <br />
            {/* <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.bedroomsChangeHandler}
                type="number"
                class="form-control"
                name="bedrooms"
                placeholder="Bedrooms"
                min="1"
                max="9"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["bedrooms"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.bathroomsChangeHandler}
                type="number"
                class="form-control"
                name="bathrooms"
                placeholder="Bathrooms"
                min="1"
                max="9"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["bathrooms"]}
            </span>
            <br /> */}
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.passwordOwnerChangeHandler}
                type="password"
                class="form-control"
                name="passwordOwner"
                placeholder="Password"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["passwordOwner"]}
            </span>
            <br />
            <div style={{ width: "30%" }}>
              <button
                onClick={this.submitCreate}
                class="btn btn-success"
                type="submit"
                style={{ fontSize: 20 }}
              >
                Create Account
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;
