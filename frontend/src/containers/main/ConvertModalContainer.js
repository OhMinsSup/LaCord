import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as fileActions from "../../store/modules/file";
import ConvertModal from "../../components/common/ConvertModal";

class ConvertModalContainer extends Component {
  onCancel = () => {
    const { FileActions } = this.props;
    FileActions.setModal();
  };

  onConvert = async selected => {
    const { FileActions, fileData } = this.props;

    try {
      if (!fileData.url) {
        await FileActions.convertImage(fileData, selected, fileData.name);
      } else {
        await FileActions.convertUrl(selected, fileData.name, fileData.url);
      }

      FileActions.setModal();
    } catch (e) {
      throw e;
    }
  };

  render() {
    const { fileData } = this.props;
    if (!fileData) return null;

    return (
      <ConvertModal
        open={!!fileData}
        fileData={fileData}
        onConvert={this.onConvert}
        onCancel={this.onCancel}
        title="파일 변환하기"
        confirmText="변환"
      />
    );
  }
}

const enhance = connect(
  ({ file }) => ({
    fileData: file.fileData && file.fileData
  }),
  dispatch => ({
    FileActions: bindActionCreators(fileActions, dispatch)
  })
);

export default enhance(ConvertModalContainer);
