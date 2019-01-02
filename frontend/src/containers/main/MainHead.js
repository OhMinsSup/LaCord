import React, { Component } from "react";
import ConvertContent from "../../components/main/ConvertContent";

class MainHead extends Component {
  onUpload = file => {
    console.log(file);
  };

  onUploadComputerClick = () => {
    const upload = document.createElement("input");
    upload.type = "file";
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      this.onUpload(file);
    };
    upload.click();
  };

  render() {
    return <ConvertContent onComputerClick={this.onUploadComputerClick} />;
  }
}

export default MainHead;
