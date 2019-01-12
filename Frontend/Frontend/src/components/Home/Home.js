import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import DeleteKey from "../DeleteKey";
import Navbar from "../LandingPage/Navbar";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      students: []
    };
    this.onDeletePressed = this.onDeletePressed.bind(this);
  }
  //get the students data from backend
  componentDidMount() {
    axios.get("http://18.225.5.238/home").then(response => {
      //update the state with the response data
      this.setState({
        students: this.state.students.concat(response.data)
      });
    });
  }

  onDeletePressed(text) {
    //this.preventDefault();
    const data = {
      studentID: text
    };

    axios.defaults.withCredentials = true;

    axios.post("http://18.225.5.238/delete", data).then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        return (window.location.href = "/home");
      }
    });
  }

  render() {
    //iterate over students to create a table row
    let details = this.state.students.map(student => {
      return (
        <tr>
          <td>{student.userName}</td>
          <td>{student.studentID}</td>
          <td>{student.department}</td>
          <td>
            <DeleteKey
              studentID={student.studentID}
              cls="btn btn-danger"
              onKeyPressed={this.onDeletePressed}
            />
          </td>
        </tr>
      );
    });
    //if not logged in go to login page
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      console.log("LOGIN OUT");
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div>
        {redirectVar}
        <Navbar />
        <div class="container">
          <h2>List of All Students</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {/*Display the Tbale row based on data recieved*/}
              {details}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
//export Home Component
export default Home;
