import React, { Component } from "react";
import Navbar from "../LandingPage/Navbar";
import Searchpagehotel from "./SearchPageHotel";

class searchpage extends Component {
  state = { travellerID: "" };

  componentWillMount() {
    this.state.travellerID = this.props.location.state.referrer.travellerID;
    console.log("Traveller search: " + this.state.travellerID);
  }
  render() {
    return (
      <div>
        <div className="heroTraveller">
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
                  {console.log("inside" + this.state.travellerID)}
                  <Searchpagehotel travellerID={this.state.travellerID} />
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default searchpage;
