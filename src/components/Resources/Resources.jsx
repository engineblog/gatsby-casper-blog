import React, { Component } from 'react';
import './Resources.css';

class Resources extends Component {
  render() {
    const { resourceEdges } = this.props;

    return (
      <div>
        <ul className="resources">
          {resourceEdges.map(({ node }) => (
            <li>
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
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Resources;
