import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResults.scss";

import Button from "../../common/Button";

const cx = classNames.bind(styles);

class SearchResults extends Component {
  renderList() {
    const { videos } = this.props;

    return videos.map(video => <div>{video}</div>);
  }

  render() {
    const { count, videos } = this.props;
    if (!videos) return null;
    return (
      <div className={cx("search-results")}>
        <div className={cx("count")}>
          총 <b>{count || 0}개</b>의 포스트를 찾았습니다.
        </div>
        {this.renderList()}
        {count > videos.length && (
          <Button
            fullWidth
            large
            theme="transparent"
            className={cx("more-btn")}
          >
            {count - videos.length}
            개의 검색결과 더보기
          </Button>
        )}
      </div>
    );
  }
}

export default SearchResults;
