import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class CreateTraveller extends Component {
  constructor(props) {
    //Call the constrictor of Super class i.e The Component
    super(props);
    //maintain the state required for this component
    this.state = {
      firstNameTraveller: "",
      emailIDTraveller: "",
      phoneNumberTraveller: "",
      lastNameTraveller: "",
      passwordTraveller: "",
      addressTraveller: "",
      bedrooms: "",
      bathrooms: "",
      errors: {}
    };
    //Bind the handlers to this class
    this.firstNameTravellerChangeHandler = this.firstNameTravellerChangeHandler.bind(
      this
    );
    this.emailIDTravellerChangeHandler = this.emailIDTravellerChangeHandler.bind(
      this
    );
    this.phoneNumberTravellerChangeHandler = this.phoneNumberTravellerChangeHandler.bind(
      this
    );
    this.submitCreate = this.submitCreate.bind(this);
  }

  firstNameTravellerChangeHandler = e => {
    this.setState({
      firstNameTraveller: e.target.value
    });
  };

  lastNameTravellerChangeHandler = e => {
    this.setState({
      lastNameTraveller: e.target.value
    });
  };

  passwordTravellerChangeHandler = e => {
    this.setState({
      passwordTraveller: e.target.value
    });
  };

  addressTravellerChangeHandler = e => {
    this.setState({
      addressTraveller: e.target.value
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

  emailIDTravellerChangeHandler = e => {
    this.setState({
      emailIDTraveller: e.target.value
    });
  };

  phoneNumberTravellerChangeHandler = e => {
    this.setState({
      phoneNumberTraveller: e.target.value
    });
  };

  submitCreate = e => {
    //prevent page from refresh
    e.preventDefault();
    if (!this.handleValidation()) {
      alert("Form has errors.");
    } else {
      const data = {
        username: this.state.firstNameTraveller,
        lastNameTraveller: this.state.lastNameTraveller,
        emailIDTraveller: this.state.emailIDTraveller,
        phoneNumberTraveller: this.state.phoneNumberTraveller,
        password: this.state.passwordTraveller,
        addressTraveller: this.state.addressTraveller
        // bedrooms: this.state.bedrooms,
        // bathrooms: this.state.bathrooms
      };
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post("http://18.225.5.238/createTraveller", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            console.log("Traveller Added: " + data);
            return (window.location.href = "/landTraveller");
          }
        });
    }
  };

  handleValidation() {
    //let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    var emailIDTravellerRegEx = /\S+@\S+\.\S+/;
    var phoneNumberTravellerRegEx = /^\+[1-9]{1}[0-9]{3,14}$/;

    if (
      this.state.firstNameTraveller === "" ||
      this.state.firstNameTraveller.length < 2
    ) {
      console.log("Less than 2");
      formIsValid = false;
      errors["firstNameTravellers"] =
        "First Name Cannot be empty or of less than 2 characters";
    }

    if (
      this.state.passwordTraveller === "" ||
      this.state.passwordTraveller.length < 4
    ) {
      console.log(
        "Less than 2: " + this.state.passwordTraveller + " name, length: "
      );
      formIsValid = false;
      errors["passwordTraveller"] =
        "Last Name Cannot be empty or of less than 4 characters";
    }

    if (
      this.state.lastNameTraveller === "" ||
      this.state.lastNameTraveller.length < 2
    ) {
      console.log(
        "Less than 2: " + this.state.lastNameTraveller + " name, length: "
      );
      formIsValid = false;
      errors["lastNameTraveller"] =
        "Last Name Cannot be empty or of less than 2 characters";
    }

    if (
      this.state.emailIDTraveller === "" ||
      !emailIDTravellerRegEx.test(this.state.emailIDTraveller)
    ) {
      formIsValid = false;
      errors["emailIDTraveller"] = "Invalid Email ID";
    }

    if (
      this.state.phoneNumberTraveller === "" ||
      !phoneNumberTravellerRegEx.test(this.state.phoneNumberTraveller)
    ) {
      formIsValid = false;
      errors["phoneNumberTraveller"] = "Phone Number Invalid";
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
                onChange={this.firstNameTravellerChangeHandler}
                type="text"
                class="form-control"
                name="firstNameTraveller"
                placeholder="First Name"
                minLength="2"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["firstNameTravellers"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.lastNameTravellerChangeHandler}
                type="text"
                class="form-control"
                name="lastNameTraveller"
                placeholder="Last Name"
                minLength="2"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["lastNameTraveller"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.emailIDTravellerChangeHandler}
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                name="emailIDTraveller"
                placeholder="Email"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["emailIDTraveller"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.phoneNumberTravellerChangeHandler}
                type="text"
                class="form-control"
                name="phoneNumberTraveller"
                placeholder="Phone Number"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["phoneNumberTraveller"]}
            </span>
            <br />
            <div style={{ width: "30%" }} class="form-group">
              <input
                onChange={this.addressTravellerChangeHandler}
                type="text"
                class="form-control"
                name="addressTraveller"
                placeholder="Address"
                maxLength="40"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["addressTraveller"]}
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
                onChange={this.passwordTravellerChangeHandler}
                type="passwordTraveller"
                class="form-control"
                name="passwordTraveller"
                placeholder="Password"
                required
              />
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["passwordTraveller"]}
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

export default CreateTraveller;
