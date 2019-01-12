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
import Cards from "./Cards";
import axios from "axios";
import ownerLogo from "../../Owner/ownerLogo.svg";
import birdHouseImg from "../../Owner/birdHouse.svg";
import { Redirect } from "react-router";

import Paper from "@material-ui/core/Paper";
import CardOwner from "./CardOwner";
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
      ownerID: "",
      property_list: [],
      state_name: [],
      redirect: false,
      username: ""
    };

    this.addProperty = this.addProperty.bind(this);
  }

  addProperty() {
    this.setState({
      redirect: true
    });
  }

  componentDidMount() {
    console.log(
      "State Transferred " +
        JSON.stringify(this.props.location.state) +
        "referrer: " +
        this.props.location.state.referrer
    );

    this.state.ownerID = this.props.location.state.referrer.ownerID;

    const data = {
      // username: this.props.location.state.referrer.username,
      // password: this.props.location.state.referrer.password,
      ownerID: this.state.ownerID
    };

    //this.state.ownerID = this.props.location.state.referrer.ownerID;

    console.log("Hi 1" + this.state.ownerID);

    this.state.username = data.username;

    console.log("Hi" + this.state.username);

    console.log("Got this User: " + JSON.stringify(data));

    axios
      .get("http://18.225.5.238/getownerproperty", { params: { data: data } })
      .then(response => {
        const data = JSON.stringify(response.data);

        this.setState({
          property_list: this.state.property_list.concat(response.data)
        });
      });
  }

  render() {
    const { classes, theme } = this.props;

    var arr3 = Object.values(this.state.property_list);
    console.log(arr3);
    // console.log(this.state.property_list.length)
    var elements = [];
    for (var i = 0; i < this.state.property_list.length; i++) {
      elements.push(<CardOwner key={i} props={arr3[i]} />);
    }
    var h1 = "Your Listed Properties";

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

    const { redirect } = this.state;

    if (redirect)
      return (
        <Redirect
          to={{
            pathname: "/welcomeOwner",
            state: { referrer: this.state.ownerID }
          }}
        />
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
            <h3>
              Your Listed Properties &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="secondary"
                onClick={this.addProperty}
              >
                Add New Property
              </Button>
            </h3>
            <br />

            <br />
            <br />
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
