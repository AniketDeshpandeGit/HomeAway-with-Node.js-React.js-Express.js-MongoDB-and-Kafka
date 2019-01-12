import React, { Component } from "react";

class DeleteKey extends Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.onKeyPressed(this.props.studentID);
  }

  render() {
    return (
      <button class={this.props.cls} onClick={this.onClick}>
        Delete
      </button>
    );
  }
}

export default DeleteKey;
