import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import LocationList from "./LocationList";
import { Link } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 5
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

const type_house = [
  {
    value: "Villa",
    label: "Villa"
  },
  {
    value: "Apartment",
    label: "Apartment"
  },
  {
    value: "Cabin",
    label: "Cabin"
  },
  {
    value: "Studio",
    label: "Studio"
  },
  {
    value: "Hotel",
    label: "Hotel"
  },
  {
    value: "Cottage",
    label: "Cottage"
  },
  {
    value: "Bunglow",
    label: "Bunglow"
  }
];
class DetailsProperty extends React.Component {
  state = {
    headline: "",
    property_description: "",
    type_house: "",
    bedrooms: "",
    accomodates: "",
    bathrooms: ""
  };

  submitDetails = e => {
    //prevent page from refresh
    e.preventDefault();

    const data = {
      headline: this.state.headline,
      property_description: this.state.property_description,
      type_house: this.state.type_house,
      bedrooms: this.state.bedrooms,
      accomodates: this.state.accomodates,
      bathrooms: this.state.bathrooms
    };
    console.log(data);

    this.props.detailsChangeHandler(data);
    this.props.handleNext();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    <Route exact path={"propertylist/location"} component={LocationList} />;
    console.log("in details" + JSON.stringify(this.props));
    const { classes } = this.props;

    return (
      <div>
        <h3>Describe Your Property</h3>
        <form className={classes.container}>
          <TextField
            id="standard-headline"
            label="Headline"
            className={classes.textField}
            //value={this.state.headline}
            onChange={this.handleChange("headline")}
            margin="normal"
            value={this.props.headline}
          />
          <br />
          <TextField
            id="standard-multiline-flexible"
            label="Property Description"
            multiline
            rowsMax="5"
            //value={this.state.property_description}
            onChange={this.handleChange("property_description")}
            className={classes.textField}
            margin="normal"
            value={this.props.property_description}
          />
          <br />
          <TextField
            label="House Type"
            //value={this.state.type_house}
            onChange={this.handleChange("type_house")}
            className={classes.textField}
            margin="normal"
            value={this.props.type_house}
          />
          <br />

          <TextField
            id="standard-bedrooms"
            label="Bedrooms"
            //value={this.state.bedrooms}
            onChange={this.handleChange("bedrooms")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            value={this.props.bedrooms}
          />
          <TextField
            id="standard-accomodates"
            label="Accomodates"
            ///value={this.state.accomodates}
            onChange={this.handleChange("accomodates")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            value={this.props.accomodates}
          />
          <TextField
            id="standard-bathrooms"
            label="Bathrooms"
            //value={this.state.bathrooms}
            onChange={this.handleChange("bathrooms")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            value={this.props.bathrooms}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={this.submitDetails}
          >
            Save
          </Button>
        </form>
      </div>
    );
  }
}

DetailsProperty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsProperty);
