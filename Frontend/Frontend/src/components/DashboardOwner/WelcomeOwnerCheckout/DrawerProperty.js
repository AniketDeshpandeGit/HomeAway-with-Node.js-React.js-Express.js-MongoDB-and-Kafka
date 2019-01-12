import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LocationList from "./LocationList";
import DetailsProperty from "./DetailsProperty";
import PricingProperty from "./PricingProperty";
import ImageUpload from "./ImageUpload";
import ownerLogo from "../../Owner/ownerLogo.svg";
import axios from "axios";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 600,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    marginTop: "100px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
});

class DrawerProperty extends React.Component {
  setStepContent = step => e => {
    console.log("Aniket 1 " + step);
    this.setState({
      activeStep: step
    });
    console.log("Aniket 2 " + this.setState.activeStep);
  };
  getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <LocationList
            locationChangeHandler={this.locationChangeHandler}
            handleNext={this.handleNext}
            country={this.country}
            street_address={this.street_address}
            unit={this.unit}
            city={this.city}
            statelive={this.statelive}
            zipcode={this.zipcode}
          />
        );
      case 2:
        return (
          <DetailsProperty
            detailsChangeHandler={this.detailsChangeHandler}
            handleNext={this.handleNext}
            headline={this.headline}
            property_description={this.property_description}
            type_house={this.type_house}
            bedrooms={this.bedrooms}
            accomodates={this.accomodates}
            bathrooms={this.bathrooms}
          />
        );
      case 3:
        return <ImageUpload handleNext={this.handleNext} />;
      case 4:
        return (
          <PricingProperty
            pricingChangeHandler={this.pricingChangeHandler}
            handleSubmit={this.handleSubmit}
            startdate={this.startdate}
            enddate={this.enddate}
            nightrate={this.nightrate}
            minimumstay={this.minimumstay}
          />
        );

      default:
        throw new Error("Unknown step");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      ownerID: "",
      value: "",
      activeStep: 1,
      country: "",
      street_address: "",
      unit: "",
      city: "",
      statelive: "",
      zipcode: "",
      headline: "",
      property_description: "",
      type_house: "",
      bedrooms: "",
      accomodates: "",
      bathrooms: "",
      startdate: "",
      enddate: "",
      nightrate: "",
      minimumstay: ""
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.detailsChangeHandler = this.detailsChangeHandler.bind(this);
    this.pricingChangeHandler = this.pricingChangeHandler.bind(this);
  }

  pricingChangeHandler = data => {
    this.startdate = data.startdate;
    this.enddate = data.enddate;
    this.nightrate = data.nightrate;
    this.minimumstay = data.minimumstay;
  };

  locationChangeHandler = data => {
    this.country = data.country;
    this.street_address = data.street_address;
    this.unit = data.unit;
    this.city = data.city;
    this.statelive = data.statelive;
    this.zipcode = data.zipcode;
  };

  detailsChangeHandler = data => {
    this.headline = data.headline;
    this.property_description = data.property_description;
    this.type_house = data.type_house;
    this.bedrooms = data.bedrooms;
    this.accomodates = data.accomodates;
    this.bathrooms = data.bathrooms;
  };

  handleSubmit() {
    console.log("On Submit" + this.country);
    console.log("ownerID ************" + this.state.ownerID);

    const data = {
      ownerID: this.state.ownerID,
      country: this.country,
      street_address: this.street_address,
      unit: this.unit,
      city: this.city,
      statelive: this.statelive,
      zipcode: this.zipcode,
      headline: this.headline,
      property_description: this.property_description,
      type_house: this.type_house,
      bedrooms: this.bedrooms,
      accomodates: this.accomodates,
      bathrooms: this.bathrooms,
      startdate: this.startdate,
      enddate: this.enddate,
      nightrate: this.nightrate,
      minimumstay: this.minimumstay
    };

    axios.post("http://18.225.5.238/checkout", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Owner Added: " + data);
        return (window.location.href = "/landOwner");
      }
    });
  }

  componentDidMount() {
    //console.log("Hi props" + this.props.location.state.referrer);
    this.state.ownerID = this.props.location.state.referrer;
  }

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  render() {
    const data = {
      username: "admin",
      password: "admin"
    };

    const { classes } = this.props;
    return (
      <div>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              <img
                alt="HomeAway logo"
                class="site-header-logo__img img-responsive"
                role="presentation"
                src={ownerLogo}
                height="400"
                width="400"
              />
            </Typography>
          </Toolbar>
        </AppBar>

        <div className={classes.root}>
          <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                List Your Property
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
            // onClick={this.getItem}
          >
            <div className={classes.toolbar} />
            <List>
              <ListItem button onClick={this.setStepContent(1)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Location
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button onClick={this.setStepContent(2)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Details
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem button onClick={this.setStepContent(3)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Photos
                    </Typography>
                  }
                />
              </ListItem>

              <ListItem button onClick={this.setStepContent(4)}>
                <ListItemText
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#000000" }}
                      variant="headline"
                    >
                      Pricing
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Divider />
          </Drawer>
          <main className={classes.content} xl>
            <div className={classes.toolbar} />

            {this.getStepContent(this.state.activeStep)}
          </main>
        </div>
      </div>
    );
  }
}

DrawerProperty.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DrawerProperty);
