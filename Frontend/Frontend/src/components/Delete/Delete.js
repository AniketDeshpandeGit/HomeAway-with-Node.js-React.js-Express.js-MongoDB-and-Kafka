import React, { Component } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: ""
    };

    this.studentIDChangeHandler = this.studentIDChangeHandler.bind(this);
  }

  studentIDChangeHandler = e => {
    this.setState({
      studentID: e.target.value
    });
  };

  DeleteBookButton = e => {
    e.preventDefault();
    const data = {
      studentID: this.state.studentID
    };

    axios.defaults.withCredentials = true;

    axios.post("http://18.225.5.238/delete", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        return (window.location.href = "/home");
      }
    });
  };

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="container">
          <form>
            <div style={{ width: "50%", float: "left" }} class="form-group">
              <input
                onChange={this.studentIDChangeHandler}
                type="text"
                class="form-control"
                name="studentID"
                placeholder="Search a Student by Student ID"
              />
            </div>
            <div style={{ width: "50%", float: "right" }}>
              <button
                onClick={this.DeleteBookButton}
                class="btn btn-success"
                type="submit"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Delete;
