import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../store/modules/user";

import storage from "../../lib/storage";

class Core extends Component {
  checkUser = async () => {
    const storageUser = storage.get("__Lacord__");
    const { UserActions } = this.props;

    if (!storageUser) return;

    UserActions.setUser(storageUser);

    try {
      await UserActions.checkUser();
    } catch (e) {
      storage.remove("__Lacord__");
    }
  };

  initialize = () => {
    this.checkUser();
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return <div />;
  }
}

const enhance = connect(
  ({ user }) => ({
    user: user.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
);

export default enhance(Core);
