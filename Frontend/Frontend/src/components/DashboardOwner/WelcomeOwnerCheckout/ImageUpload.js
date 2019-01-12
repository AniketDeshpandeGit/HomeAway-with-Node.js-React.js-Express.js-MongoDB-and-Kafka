import React, { Component } from "react";
import ImageUploader from "react-images-upload";

import axios from "axios";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      selectedFile: [],
      imageView: ""
    };
  }
  onChange = (picture, pictureDataURLs) => {
    this.setState({
      selectedFile: picture.concat(picture)
    });
  };

  onSubmit = e => {
    console.log("On Submit");
    e.preventDefault();
    const { description, selectedFile } = this.state;

    for (let size = 0; size < selectedFile.length / 2; size++) {
      let formData = new FormData();
      console.log("File Selected: " + selectedFile[size]);

      formData.append("selectedFile", selectedFile[size]);

      axios.post("http://18.225.5.238/imageUpload", formData).then(result => {
        // access results...
      });
    }

    this.props.handleNext();
  };

  render() {
    const { description, selectedFile } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <ImageUploader
            withIcon={true}
            type="file"
            name="selectedFile"
            onChange={this.onChange}
            imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
            withPreview
            multiple
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ImageUpload;
