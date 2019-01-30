import React from "react";
import classNames from "classnames/bind";
import styles from "./IntroductionCards.scss";

import { FaLaptop, FaLink, FaYoutube } from "react-icons/fa";

const cx = classNames.bind(styles);

const IntroductionCard = ({ boder, boder2, text, description, icon }) => {
  return (
    <div className={cx("introduction-card", { boder }, { boder2 })}>
      <div className={cx("card")}>
        <div className={cx("card-content")}>
          <div className={cx("wrapper")}>
            {icon}
            <b>{text}</b>
            <span>{description}</span>
          </div>
        </div>
      </div>
      <div className={cx("hover")} />
    </div>
  );
};

const IntroductionCards = () => (
  <div className={cx("introduction-cards")}>
    <div className={cx("inner")}>
      <div className={cx("flex")}>
        <IntroductionCard
          icon={<FaLaptop />}
          text="컴퓨터"
          description="컴퓨터내의 사진을 자신이 원하는 형태로 변환시켜 보세요"
          boder={true}
          boder2={false}
        />
        <IntroductionCard
          icon={<FaLink />}
          text="URL"
          description="URL을 자신이 원하는 사진으로 변환시키세요"
          boder={true}
          boder2={false}
        />
        <IntroductionCard
          icon={<FaYoutube />}
          text="유튜브"
          description="유튜브의 동영상을 Mp3, Mp4로 변환시켜 보세요"
          boder={false}
          boder2={false}
        />
      </div>
    </div>
  </div>
);

export default IntroductionCards;
