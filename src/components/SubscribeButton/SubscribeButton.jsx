import React from "react";
import "./SubscribeButton.css";

class SubscribeButton extends React.Component {
  render() {
    const { url } = this.props;
    if (url) {
      return (
        <a className="subscribe-button" href={url}>
          🖂 Subscribe   
        </a>
      );
    }
    return null;
  }
}

export default SubscribeButton;
