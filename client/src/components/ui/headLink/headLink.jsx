import React from 'react';

import './_index.scss';
import PropTypes from 'prop-types';

const HeadLink = ({ svg, header, content }) => {
  return (
    <div className="head-link">
      {svg}
      <h2 className="head-link__header">{header}</h2>
      <span className="head-link__content">{content}</span>
    </div>
  );
};
HeadLink.propTypes = {
  svg: PropTypes.node,
  header: PropTypes.string,
  content: PropTypes.node
};

export default HeadLink;
