import React, { Component } from 'react';
import './Resources.css';

class Resources extends Component {
  render() {
    const { resourceEdges } = this.props;

    return (
      <div>
        {resourceEdges.map(({ node }) => (
          <div>
            <h2 id={node.frontmatter.anchor}>
              <a
                href={node.frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {node.frontmatter.title}
              </a>
            </h2>
            <section dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        ))}
      </div>
    );
  }
}

export default Resources;
