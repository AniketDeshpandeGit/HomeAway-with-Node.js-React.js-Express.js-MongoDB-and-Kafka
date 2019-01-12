import React, { Component } from "react";
import ownerLogo from "./ownerLogo.svg";
import birdHouseImg from "./birdHouse.svg";
import ownerBanner from "./ownerBanner.png";
import { Grid, Paper } from "@material-ui/core";
import Login from "../Login/Login";
import Create from "../Create/Create";

class landOwner extends Component {
  constructor(props) {
    console.log("Inside Login");
    //Call the constrictor of Super class i.e The Component
    super(props);
    this.state = {
      selectedOption: "",
      loginData: {},
      signUpData: {}
    };

    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.onOwnerLogin = this.onOwnerLogin.bind(this);
    this.onOwnerSignUp = this.onOwnerSignUp.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedOption: "login"
    });
  }

  handleOptionChange(e) {
    console.log(e.target.value);
    this.setState({
      selectedOption: e.target.value
    });
  }

  onOwnerLogin(e) {}

  onOwnerSignUp(e) {}

  render() {
    let setForm = null;
    if (this.state.selectedOption === "login") {
      console.log("Inside Login");
      setForm = <Login />;
    } else if (this.state.selectedOption === "signUp") {
      console.log("Inside SignUp");
      setForm = <Create />;
    }

    let birdHouse = (
      <ul class="nav navbar-nav navbar-right">
        <li>
          <div class="navbar-header">
            <a class="site-header-logo__link flex-item">
              <img
                alt="HomeAway logo"
                class="site-header-logo__img img-responsive"
                role="presentation"
                src={birdHouseImg}
                height="80"
                width="100"
              />
            </a>
          </div>
        </li>
      </ul>
    );
    return (
      <div>
        <header role="banner">
          <nav
            class="navbar navbar"
            position="static"
            style={{
              background: "transparent",
              boxShadow: "none",
              height: 90
            }}
          >
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="site-header-logo__link flex-item" href="/">
                  <img
                    alt="HomeAway logo"
                    class="site-header-logo__img img-responsive"
                    role="presentation"
                    src={ownerLogo}
                    height="300"
                    width="350"
                  />
                </a>
              </div>
              {birdHouse}
            </div>
          </nav>
        </header>

        <Grid container>
          {/* <Grid item sm>
            <center>
              <Paper style={{ padding: 10, marginTop: 10, marginBottom: 10 }}>
                <img
                  style={{ padding: 0, marginTop: 10, marginBottom: 10 }}
                  alt="HomeAway logo"
                  class="site-header-logo__img img-responsive"
                  role="presentation"
                  src={ownerBanner}
                  height="1500"
                  width="1800"
                />
              </Paper>
            </center>
          </Grid> */}

          <Grid item sm>
            <Paper>
              <center>
                <div class="radio">
                  <label style={{ fontSize: 20 }}>
                    <input
                      type="radio"
                      name="optradio"
                      value="login"
                      onChange={this.handleOptionChange}
                      checked={this.state.selectedOption == "login"}
                    />
                    Login
                  </label>
                  &nbsp;&nbsp;
                  <label style={{ fontSize: 20 }}>
                    <input
                      type="radio"
                      name="optradio"
                      value="signUp"
                      onChange={this.handleOptionChange}
                    />
                    SignUp
                  </label>
                </div>

                <div>{setForm}</div>
              </center>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default landOwner;
