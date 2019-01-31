import React, { Component, Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as fileActions from "../../store/modules/file";
import * as userActions from "../../store/modules/user";
import * as baseActions from "../../store/modules/base";

import UserMenu from "../../components/base/UserMenu";
import storage from "../../lib/storage";
import QuestionModal from "../../components/common/QuestionModal";

class UserMenuContainer extends Component {
  onConfirmUnregister = async () => {
    const { UserActions } = this.props;

    try {
      await UserActions.generateUnregisterToken();
      const { unregisterToken } = this.props;
      if (!unregisterToken) return;

      await UserActions.unregister(unregisterToken);
      storage.clear();

      if (window && window.location) {
        window.location.href = "/";
      }
    } catch (e) {}
  };

  onCancel = () => {
    this.props.UserActions.askUnregister(false);
  };

  onAskUnregister = () => {
    this.props.UserActions.askUnregister(true);
  };

  onLogout = () => {
    const { UserActions } = this.props;

    UserActions.logout();
    storage.remove("__Lacord__");
    window.location.href = "/";
  };

  onUpload = async file => {
    const { FileActions, BaseActions } = this.props;

    await FileActions.createThumbnail(file);
    BaseActions.setUserMenu(false);
  };

  onClick = () => {
    const upload = document.createElement("input");
    upload.type = "file";
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      if (!file) return;

      this.onUpload(file);
    };
    upload.click();
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
    const { userMenu, user, askUnregister } = this.props;
    if (!userMenu) return null;

    return (
      <Fragment>
        <UserMenu
          onLogout={this.onLogout}
          user={user}
          onAskUnregister={this.onAskUnregister}
          onClick={this.onClick}
        />
        <QuestionModal
          title="회원 탈퇴"
          description="정말로 회원탈퇴를 하시겠습니까? 이용하신 모든 정보가 초기화되며 복구가 불가능합니다."
          onCancel={this.onCancel}
          onConfirm={this.onConfirmUnregister}
          open={askUnregister}
          confirmText="탈퇴"
        />
      </Fragment>
    );
  }
}

const enhance = connect(
  ({ user, base, file }) => ({
    status: file.status,
    askUnregister: user.askUnregister,
    unregisterToken: user.unregisterToken,
    userMenu: base.user_menu,
    user: user.user && user.user
  }),
  dispatch => ({
    FileActions: bindActionCreators(fileActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
);

export default enhance(UserMenuContainer);
