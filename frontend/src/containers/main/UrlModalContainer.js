import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as fileActions from "../../store/modules/file";
import * as baseActions from "../../store/modules/base";
import UrlModal from "../../components/common/UrlModal";
import { isUrl } from "../../lib/common";

class UrlModalContainer extends Component {
  onValidate = {
    url: value => {
      if (!isUrl(value)) {
        this.setState({
          error: "잘못된 URL 형식 입니다."
        });
        return false;
      }
      this.setState({
        error: null
      });
      return true;
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      input: "",
      error: null
    };
  }

  onChange = e => {
    const { value } = e.target;

    this.setState({
      input: value
    });

    const validation = this.onValidate["url"](value);
    if (!validation) return;
  };

  onCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideUrlModal();
  };

  render() {
    const { input, error } = this.state;
    const { url_modal } = this.props;

    return (
      <UrlModal
        open={url_modal}
        input={input}
        error={error}
        title="Youtube 변환"
        confirmText="변환"
        onChange={this.onChange}
        onCancel={this.onCancel}
      />
    );
  }
}

const enhance = connect(
  ({ base }) => ({
    url_modal: base.url_modal
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    FileActions: bindActionCreators(fileActions, dispatch)
  })
);

export default enhance(UrlModalContainer);
