import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./SearchResults.scss";

import Button from "../../common/Button";
import Video from "../../common/Video";

const cx = classNames.bind(styles);

class SearchResults extends Component {
  renderList() {
    const { videos, onClick } = this.props;

    return videos.map((video, index) => (
      <Video key={index} video={video} onClick={onClick} />
    ));
  }

  render() {
    const { count, videos, onSearchNext } = this.props;
    if (!videos) return null;
    return (
      <div className={cx("search-results")}>
        <div className={cx("count")}>
          총 <b>{count || 0}개</b>의 포스트를 찾았습니다.
        </div>
        <div className={cx("videos")}>{this.renderList()}</div>
        {count > videos.length && (
          <Button
            theme="transparent"
            className={cx("more-btn")}
            onClick={onSearchNext}
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
