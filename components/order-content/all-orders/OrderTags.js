import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class OrderTags extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    OrderTags.propTypes = {
      chainName: PropTypes.string,
      tags: PropTypes.object,
    };

    const { tags, chainName } = this.props;
    const orderedTags = tags.map((tag, index) => (
      <Link
        key={`tag-${index}`}
        href={{
          pathname: `/chains/[name]/[tag]`,
          query: { chainName: chainName.toLowerCase(), tag },
        }}
        as={{ pathname: `/chains/${chainName.toLowerCase()}/${tag}` }}
      >
        <a href={`/chains/${chainName.toLowerCase()}/${tag}`}>
          <span key={`tag-${index}`}>{tag.replace(/-/g, ' ')}</span>
        </a>
      </Link>
    ));

    return (
      <div className="tag-row">
        <div className="tags">{orderedTags}</div>
      </div>
    );
  }
}
