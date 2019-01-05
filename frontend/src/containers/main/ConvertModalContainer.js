import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as fileActions from "../../store/modules/file";
import ConvertModal from "../../components/common/ConvertModal";

class ConvertModalContainer extends Component {
  render() {
    const { fileData } = this.props;

    return (
      <ConvertModal
        open={!!fileData}
        title="파일 변환하기"
        confirmText="변환"
      />
    );
  }
}

const enhance = connect(
  ({ file }) => ({
    fileData: file.fileData
  }),
  dispatch => ({
    FileActions: bindActionCreators(fileActions, dispatch)
  })
);

export default enhance(ConvertModalContainer);
