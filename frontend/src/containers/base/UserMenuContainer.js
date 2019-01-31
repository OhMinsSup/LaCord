import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../store/modules/user";
import * as baseActions from "../../store/modules/base";

import UserMenu from "../../components/base/UserMenu";
import storage from "../../lib/storage";

class UserMenuContainer extends Component {
  onLogout = () => {
    const { UserActions } = this.props;

    UserActions.logout();
    storage.remove("__Lacord__");
    window.location.href = "/";
  };

  onClick = () => {
    const upload = document.createElement("input");
    upload.type = "file";
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      console.log(file);
    };
    upload.click();
  };

  render() {
    const { userMenu, user } = this.props;

    if (!userMenu) return null;

    return (
      <UserMenu onLogout={this.onLogout} user={user} onClick={this.onClick} />
    );
  }
}

const enhance = connect(
  ({ user, base }) => ({
    userMenu: base.user_menu,
    user: user.user && user.user
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
);

export default enhance(UserMenuContainer);
