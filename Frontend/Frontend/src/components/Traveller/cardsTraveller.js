import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";

const styles = theme => ({
  card: {
    display: "flex",

    height: "auto",
    padding: "1%",
    maxWidth: "600"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    height: 200,
    width: 200
  },
  controls: {
    display: "flex"
  }
});

class cardsTraveller extends Component {
  constructor() {
    super();
    this.state = {
      property_list: [],
      ownerkey: "",
      propertykey: ""
    };
    this.bookProperty = this.bookProperty.bind(this);
  }

  bookProperty = e => {
    console.log("in bookProperty");
    const data = {
      travellerID: this.props.travellerID,
      propertyID: this.props.props.propertyID,
      ownerID: this.props.props.ownerID
    };
    //console.log(data)
    axios.defaults.withCredentials = true;

    axios.post("http://18.225.5.238/bookProperty", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        this.setState({
          authFlag: true
        });
      } else {
        this.setState({
          authFlag: false
        });
      }
    });
  };

  render() {
    //console.log(this.props.props.state)
    const { classes, theme } = this.props;
    {
      console.log(
        "Finally " +
          this.props.travellerID +
          "1 " +
          this.props.props.propertyID +
          "2 " +
          this.props.props.ownerID
      );
    }

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image="https://images.pexels.com/photos/9298/light-art-house-architecture.jpg?cs=srgb&dl=architecture-art-chandelier-9298.jpg&fm=jpg"
          title="Property"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography gutterBottom component="h1" variant="headline">
              {this.props.props.headline}
            </Typography>
            <Typography variant="subheading" color="textSecondary">
              Bedrooms: {this.props.props.bedrooms} Bathrooms:{" "}
              {this.props.props.bathrooms} Sleeps:{" "}
              {this.props.props.accomodates}
            </Typography>

            <Typography gutterBottom align="center" variant="h1">
              ${this.props.props.nightrate} per night
              <br />
            </Typography>

            <Typography component="p">
              {this.props.props.property_description}
            </Typography>
            <CardActions>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={this.bookProperty}
              >
                Book
              </Button>
            </CardActions>
          </CardContent>
        </div>
      </Card>
    );
  }
}

cardsTraveller.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(cardsTraveller);
