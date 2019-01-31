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

  render() {
    const { userMenu, user } = this.props;

    if (!userMenu) return null;

    return <UserMenu onLogout={this.onLogout} user={user} />;
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
