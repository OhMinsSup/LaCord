import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as fileActions from "../../store/modules/file";

import ConvertContent from "../../components/main/ConvertContent";

class MainHead extends Component {
  onUpload = file => {
    const { FileActions } = this.props;
    FileActions.setFile(file);
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

const enhance = connect(
  ({ file }) => ({}),
  dispatch => ({
    FileActions: bindActionCreators(fileActions, dispatch)
  })
);

export default enhance(MainHead);
