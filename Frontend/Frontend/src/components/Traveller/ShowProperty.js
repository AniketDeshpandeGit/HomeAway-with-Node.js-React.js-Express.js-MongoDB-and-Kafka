import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//import Navbar from ".././Navbar/navbar";
import Cards from "./cardsTraveller";
import axios from "axios";
import ownerLogo from "../Owner/ownerLogo.svg";
import birdHouseImg from "../Owner/birdHouse.svg";

import Paper from "@material-ui/core/Paper";
const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    position: "fixed",
    top: "0",
    marginTop: "100px"
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: "100px"
  }
});

class ShowProperty extends Component {
  constructor() {
    super();
    this.state = {
      travellerID: "",
      property_list: [],
      state_name: []
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    //const travellerID = this.props.location.state.referrer.travellerID;

    console.log("Traveller Show Prop: " + this.state.x);
    console.log("Travel Shows: " + this.props.location.state.travellerID);
    const data = {
      city: this.props.location.state.search,
      // date_from: this.props.location.state.date_from,
      // date_to: this.props.location.state.date_to,
      accomodates: this.props.location.state.num_people
    };

    console.log(data);
    axios
      .get("http://18.225.5.238/getTravelProperty", {
        params: { data: data }
      })
      .then(response => {
        const data = JSON.stringify(response.data);

        this.setState({
          property_list: this.state.property_list.concat(response.data)
        });
      });
  }

  render() {
    const { classes, theme } = this.props;
    // var rowelements=[]
    // for(var i=0;i<this.state.property_list.length;i++){
    //     rowelemets[i]=Object.keys(this.state.property_list)

    // }
    {
      const traveller = this.props.location.state.travellerID;
      console.log("Pri " + traveller);
      console.log("Sec " + this.props.location.state.travellerID);
      this.state.travellerID = traveller;
      console.log("Sec " + this.state.travellerID);
    }
    var arr3 = Object.values(this.state.property_list);
    console.log(arr3);
    // console.log(this.state.property_list.length)
    var elements = [];
    for (var i = 0; i < this.state.property_list.length; i++) {
      elements.push(
        <Cards travellerID={this.state.travellerID} key={i} props={arr3[i]} />
      );
    }
    //   console.log("this. property Ani "+this.state.property_list)
    //       var data=this.state.property_list
    //       var row1=JSON.stringify(data[0])
    //       console.log("data"+row1)
    // var keys = Object.keys(this.state.property_list)
    // console.log("Keys" + keys[1])

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
              height: 30
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
                    height="250"
                    width="400"
                  />
                </a>
              </div>
              {birdHouse}
            </div>
          </nav>
        </header>
        <div>
          <Paper className={classes.paper} elevation={1}>
            {elements}
          </Paper>
        </div>
      </div>
    );
  }
}

ShowProperty.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ShowProperty);
