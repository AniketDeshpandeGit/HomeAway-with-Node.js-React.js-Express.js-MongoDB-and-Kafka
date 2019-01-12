import React, { Component } from "react";
import Navbar from "../LandingPage/Navbar";

class Welcome extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="hero">
          <div className="hero-overlay" />
          <Navbar />
          <div class="Jumbotron">
            <center>
              <div
                class="container"
                style={{ background: "transparent", boxShadow: "none" }}
              >
                <div
                  class="jumbotron"
                  style={{ background: "transparent", boxShadow: "none" }}
                >
                  <h1 class="HeadLine">
                    <span class="HeadLine__text" style={{ color: "white" }}>
                      Book beach houses, cabins,
                    </span>
                    <br />
                    <span class="HeadLine__text" style={{ color: "white" }}>
                      condos and more, worldwide
                    </span>
                    <br />
                    <br />
                  </h1>
                  <a href="/landOwner" class="btn btn-info btn-lg">
                    <h4 class="glyphicon glyphicon-home" /> Owner
                  </a>
                  &nbsp; &nbsp; &nbsp;
                  <a href="/landTraveller" class="btn btn-info btn-lg">
                    <h4 class="glyphicon glyphicon-user" /> Traveller
                  </a>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
