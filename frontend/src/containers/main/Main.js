import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as fileActions from "../../store/modules/file";
import * as baseActions from "../../store/modules/base";

import ConvertContent from "../../components/main/ConvertContent";
import IntroductionCards from "../../components/main/IntroductionCards";

class Main extends Component {
  onUpload = file => {
    const { FileActions } = this.props;
    FileActions.setFile(file);
  };

  onClick = () => {
    const { BaseActions } = this.props;
    BaseActions.showUrlModal();
  };

  render() {
    return (
      <Fragment>
        <ConvertContent onUpload={this.onUpload} onClick={this.onClick} />
        <IntroductionCards />
      </Fragment>
    );
  }
}

const enhance = connect(
  ({ base, file }) => ({}),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    FileActions: bindActionCreators(fileActions, dispatch)
  })
);

export default enhance(Main);
