import React from 'react';
import './PostFormatting.css';

class PostFormatting extends React.Component {
  render() {
    const { children, className } = this.props;
    console.log(`CLASSNAME IS ${className}`);
    return <article className={className}>{children}</article>;
  }
}
export default PostFormatting;
