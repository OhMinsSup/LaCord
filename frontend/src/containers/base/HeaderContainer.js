import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../../store/modules/user";

import Header from "../../components/base/Header";

class HeaderContainer extends Component {
  render() {
    return <Header />;
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

export default enhance(HeaderContainer);
