import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../store/modules/user";
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
    const { logged } = this.props;
    return (
      <Fragment>
        <ConvertContent
          onUpload={this.onUpload}
          onClick={this.onClick}
          logged={logged}
        />
        <IntroductionCards />
      </Fragment>
    );
  }
}

const enhance = connect(
  ({ user }) => ({
    logged: !!user.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    FileActions: bindActionCreators(fileActions, dispatch)
  })
);

export default enhance(Main);
