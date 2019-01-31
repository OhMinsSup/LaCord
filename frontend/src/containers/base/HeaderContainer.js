import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../store/modules/user";
import * as baseActions from "../../store/modules/base";

import Header from "../../components/base/Header";
import UserMenuContainer from "./UserMenuContainer";

class HeaderContainer extends Component {
  onClick = () => {
    const { BaseActions, userMenu } = this.props;

    BaseActions.setUserMenu(userMenu ? false : true);
  };

  render() {
    const { logged, user } = this.props;
    return (
      <Header
        logged={logged}
        user={user}
        menu={<UserMenuContainer eventTypes="click" />}
        onClick={this.onClick}
      />
    );
  }
}

const enhance = connect(
  ({ user, base }) => ({
    logged: !!user.user,
    userMenu: base.user_menu,
    user: user.user && user.user
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
);

export default enhance(HeaderContainer);
