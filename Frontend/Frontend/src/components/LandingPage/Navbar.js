import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import Logo from "./logo-bceheader-white.svg";

//create the Navbar Component
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  //handle logout to destroy the cookie
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
  };
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout}>
              <span class="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a
              href="/login"
              class="btn btn-info btn-sm"
              style={{ background: "transparent", boxShadow: "none" }}
            >
              <h4 class="glyphicon glyphicon-log-in" /> Login
            </a>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    // if (cookie.load("cookie")) {
    //   redirectVar = <Redirect to="/" />;
    // }
    return (
      <div>
        {redirectVar}
        <header role="banner">
          <nav
            class="navbar navbar"
            position="static"
            style={{ background: "transparent", boxShadow: "none" }}
          >
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="site-header-logo__link flex-item" href="#">
                  <img
                    alt="HomeAway logo"
                    class="site-header-logo__img img-responsive"
                    role="presentation"
                    src={Logo}
                    height="400"
                    width="300"
                  />
                </a>
              </div>

              {/* {navLogin} */}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default Navbar;
