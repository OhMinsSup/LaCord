import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../store/modules/user";
import * as baseActions from "../../store/modules/base";
import * as fileActions from "../../store/modules/file";

import Header from "../../components/base/Header";
import UserMenuContainer from "./UserMenuContainer";

class HeaderContainer extends Component {
  onClick = () => {
    const { BaseActions, userMenu } = this.props;
    BaseActions.setUserMenu(userMenu ? false : true);
  };

  initilize = () => {
    const { UserActions } = this.props;
    UserActions.getUserInfo();
  };

  componentDidMount() {
    this.initilize();
  }

  componentDidUpdate(preProps) {
    if (preProps.status !== this.props.status) {
      this.initilize();
    }
  }

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
  ({ user, base, file }) => ({
    logged: !!user.user,
    status: file.status,
    userMenu: base.user_menu,
    user: user.user && user.user
  }),
  dispatch => ({
    FileActions: bindActionCreators(fileActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
);

export default enhance(HeaderContainer);
