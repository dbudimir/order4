import React, { Component } from 'react';
import Link from 'next/link';

export default class OrderTags extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const tags = this.props.tags.map((tag, index) => (
      <Link
        key={`tag-${index}`}
        href={{
          pathname: `/chains/[name]/[tag]`,
          query: { chainName: this.props.chainName.toLowerCase(), tag: tag }
        }}
        as={{ pathname: `/chains/${this.props.chainName.toLowerCase()}/${tag}` }}
      >
        <a href={`/chains/${this.props.chainName.toLowerCase()}/${tag}`}>
          <span key={`tag-${index}`}>{tag.replace(/-/g, ' ')}</span>
        </a>
      </Link>
    ));

    return (
      <div className="tag-row">
        <div className="tags">{tags}</div>
      </div>
    );
  }
}
