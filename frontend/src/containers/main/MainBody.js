import React, { Component } from "react";
import { connect } from "react-redux";
import ConvertTools from "../../components/main/ConvertTools";

class MainBody extends Component {
  render() {
    return <ConvertTools />;
  }
}

const enhance = connect(
  state => ({}),
  dispatch => ({})
);

export default enhance(MainBody);
