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
      error: null,
      select: "jpeg"
    };
  }

  onSelect = e => {
    const { value } = e.target;

    this.setState({
      select: value
    });
  };

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

  onConvert = async () => {
    const { select, input } = this.state;
    const { FileActions } = this.props;

    try {
      await FileActions.convertUrl(select, input, input);
    } catch (e) {
      throw e;
    }
  };

  render() {
    const { input, error, select } = this.state;
    const { url_modal } = this.props;

    return (
      <UrlModal
        open={url_modal}
        input={input}
        error={error}
        selected={select}
        title="URL 변환"
        confirmText="변환"
        onConvert={this.onConvert}
        onSelect={this.onSelect}
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
