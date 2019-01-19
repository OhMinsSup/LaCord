// eslint-disable-next-line no-unused-vars
/*global google*/
import React, { Component } from "react";
import classNames from "classnames/bind";
import styles from "./ConvertContent.scss";
import { FaGoogleDrive, FaDropbox, FaLink, FaLaptop } from "react-icons/fa";
import DropdownButton from "../DropdownButton/DropdownButton";
import loadScript from "load-script";

const google = (window.google = window.google ? window.google : {});
const cx = classNames.bind(styles);

class ConvertContent extends Component {
  oauthToken = null;

  constructor(props) {
    super(props);
    this.state = {
      authLoad: false,
      pickerLoad: false,
      dropboxLoad: false,
      lable_title: "Computer"
    };
    this.onLoadDropBoxAPI = this.onLoadDropBoxAPI.bind(this);
    this.onLoadGoogleDriveAPI = this.onLoadGoogleDriveAPI.bind(this);
    this.onGoogleDriveClick = this.onGoogleDriveClick.bind(this);
    this.onDropBoxClick = this.onDropBoxClick.bind(this);
    this.onAuth = this.onAuth.bind(this);
    this.onPicker = this.onPicker.bind(this);
  }

  onMouseOver = name => {
    this.setState({
      lable_title: name
    });
  };

  onAuth() {
    window.gapi.auth.authorize(
      {
        client_id:
          "23034082308-13i77g116r2ovl7r8o11b12f3a25fj88.apps.googleusercontent.com",
        scope: ["https://www.googleapis.com/auth/drive.file"]
      },
      oauthClient => {
        if (oauthClient && !oauthClient.error) {
          this.oauthToken = oauthClient.access_token;
          this.onPicker();
        } else {
          throw new Error("oauthClient not define");
        }
      }
    );
  }

  onPicker() {
    const { authLoad, pickerLoad } = this.state;
    const { onUpload } = this.props;
    if (authLoad && pickerLoad) {
      if (this.oauthToken) {
        const picker = new google.picker.PickerBuilder()
          .setOAuthToken(this.oauthToken)
          .addView(google.picker.ViewId.PHOTOS)
          .addView(new google.picker.DocsView())
          .setCallback(data => {
            if (data.action === google.picker.Action.PICKED) {
              const { mimeType, name, sizeBytes, url } = data.docs[0];
              onUpload({
                name,
                type: mimeType,
                size: sizeBytes,
                url
              });
            }
          })
          .build();
        picker.setVisible(true);
      }
    }
  }

  onGoogleDriveClick() {
    window.gapi.load("auth", this.onAuth);
    window.gapi.load("picker", this.onPicker);
  }

  onDropBoxClick() {
    const { onUpload } = this.props;
    // eslint-disable-next-line prefer-const
    let type = [];

    window.Dropbox.choose({
      success: file => {
        const { name, bytes, link } = file[0];
        name.split(".").map(name => type.push(name));
        onUpload({ name, size: bytes, type: type[type.length - 1], url: link });
      },
      multiselect: true
    });
  }

  onComputerClick = () => {
    const upload = document.createElement("input");
    upload.type = "file";
    upload.onchange = e => {
      if (!upload.files) return;
      const file = upload.files[0];
      this.props.onUpload(file);
    };
    upload.click();
  };

  onUrlClick = () => {
    this.props.onClick();
  };

  onLoadGoogleDriveAPI() {
    window.gapi.load("auth", () => {
      this.setState({
        authLoad: true
      });
    });
    window.gapi.load("picker", () => {
      this.setState({
        pickerLoad: true
      });
    });
  }

  onLoadDropBoxAPI() {
    this.setState({
      dropboxLoad: true
    });
  }
  
  componentDidMount() {
    loadScript("https://apis.google.com/js/api.js", this.onLoadGoogleDriveAPI);
    loadScript(
      "https://www.dropbox.com/static/api/2/dropins.js",
      {
        attrs: {
          id: "dropboxjs",
          "data-app-key": "xybx46lekf3atxf"
        }
      },
      this.onLoadDropBoxAPI
    );
  }

  render() {
    const { lable_title } = this.state;
    const {
      onGoogleDriveClick,
      onDropBoxClick,
      onComputerClick,
      onUrlClick
    } = this;

    return (
      <div className={cx("convert-content")}>
        <h1>파일 변환기</h1>
        <div className={cx("container")}>
          <div className={cx("file-source-wrapper")}>
            <span className={cx("title")}>
              Select files to convert or drag & drop
            </span>
            <div className={cx("file-source-button")}>
              <label className={cx("action-label")}>
                <span>From {lable_title}</span>
              </label>
              <div className={cx("menu-wrapper")}>
                <div className={cx("dropdown-menu")}>
                  <DropdownButton
                    icon={<FaLaptop />}
                    type={lable_title === "Computer"}
                    name="Computer"
                    onMouseOver={this.onMouseOver}
                    onClick={onComputerClick}
                  />
                  <DropdownButton
                    icon={<FaGoogleDrive />}
                    type={lable_title === "GoogleDirve"}
                    onClick={onGoogleDriveClick}
                    name="GoogleDirve"
                    onMouseOver={this.onMouseOver}
                  />
                  <DropdownButton
                    icon={<FaDropbox />}
                    type={lable_title === "Dropbox"}
                    name="Dropbox"
                    onMouseOver={this.onMouseOver}
                    onClick={onDropBoxClick}
                  />
                  <DropdownButton
                    icon={<FaLink />}
                    type={lable_title === "Link"}
                    name="Link"
                    onMouseOver={this.onMouseOver}
                    onClick={onUrlClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConvertContent;
