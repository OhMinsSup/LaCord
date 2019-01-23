import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchBar.scss";

import { IoIosSearch } from "react-icons/io";
import { withRouter } from "react-router-dom";
import debounce from "lodash/debounce";
import queryString from "query-string";

const cx = classNames.bind(styles);

class SearchBar extends Component {
  input = React.createRef();
  state = {
    value: ""
  };
  constructor(props) {
    super(props);
    const { q } = queryString.parse(this.props.location.search);

    if (q) {
      this.state.value = q;
    }
  }

  componentDidMount() {
    const { value } = this.state;
    if (value) {
      this.onSearch();
    }
  }

  onSearch = () => {
    const { value } = this.state;
    this.props.onSearch(value);
  };

  debouncedSearch = debounce(this.onSearch, 500);

  onChange = e => {
    this.setState(
      {
        value: e.target.value
      },
      () => {
        this.debouncedSearch();
      }
    );
  };

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.onSearch();
      const input = this.input.current;
      if (!input) return;
      input.blur();
    }
  };

  render() {
    const { value } = this.state;
    return (
      <div className={cx("search-bar")}>
        <IoIosSearch />
        <input
          placeholder="찾고싶은 검색어를 입력하세요."
          value={value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          autoFocus
          type="search"
          ref={this.input}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
