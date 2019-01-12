import React, { Component } from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import cookie from "react-cookies";
import ShowProperty from "./ShowProperty";
//import Navbar from "../Navbar/navbar";
import { Grid } from "@material-ui/core";
//import Image from "../../maldives.jpg";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    direction: "row"
    // backgroundColor: 'white'
    //backgroundImage: `url(${Image})`
  },
  input: {
    color: "white"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    color: "black"
  },
  paper: {
    color: "white"
  }
});

class SearchPageHotel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      date_from: "",
      date_to: "",
      num_people: ""
    };
    this.SearchProperties = this.SearchProperties.bind(this);
  }

  componentDidMount() {
    var cookieload = cookie.load("cookie");
    // var getdata=cookies.get('username')
    // var a=cookieload
    //var a = cookieload[18];
    console.log("in search");

    console.log("Travel 2" + this.props.travellerID);
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  SearchProperties = e => {
    console.log("in Bookit");

    const data = {
      search: this.state.search,
      date_from: this.state.date_from,
      date_to: this.state.date_to,
      num_people: this.state.num_people
    };
    console.log(data);
    this.state.history.push({
      pathname: "/show",
      state: {
        search: this.state.search,
        date_from: this.state.date_from,
        date_to: this.state.date_to,
        num_people: this.state.num_people
      }
    });
  };

  render() {
    <Route path="/show" component={ShowProperty} />;

    const { classes } = this.props;
    return (
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <TextField
            id="standard-search"
            label="Search field"
            type="search"
            className={classes.textField}
            value={this.state.search}
            onChange={this.handleChange("search")}
            margin="normal"
            InputProps={{
              className: classes.input
            }}
          />

          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            value={this.state.date_from}
            onChange={this.handleChange("date_from")}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              className: classes.input
            }}
          />

          <TextField
            id="date"
            label="Return Date"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            value={this.state.date_to}
            onChange={this.handleChange("date_to")}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              className: classes.input
            }}
          />

          <TextField
            id="standard-number"
            label="Number"
            value={this.state.num_people}
            onChange={this.handleChange("num_people")}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              className: classes.input
            }}
            margin="normal"
          />

          <Route
            render={({ history }) => (
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.paper}
                onClick={() => {
                  history.push({
                    pathname: "/show",
                    state: {
                      search: this.state.search,
                      date_from: this.state.date_from,
                      date_to: this.state.date_to,
                      num_people: this.state.num_people,
                      travellerID: this.props.travellerID
                    }
                  });
                }}
              >
                Search
              </Button>
            )}
          />
        </Grid>
      </Grid>
    );
  }
}

SearchPageHotel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchPageHotel);
