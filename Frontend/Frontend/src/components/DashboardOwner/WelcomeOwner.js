import React, { Component } from "react";
import DrawerProperty from "./WelcomeOwnerCheckout/DrawerProperty";

//Create a WelcomeOwner Component
class WelcomeOwner extends Component {
  render() {
    return (
      <div>
        <DrawerProperty
          username={this.props.location.state.referrer.username}
        />
      </div>
    );
  }
}
//Export The WelcomeOwner Component
export default WelcomeOwner;
