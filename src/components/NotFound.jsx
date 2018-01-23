import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ children }) => (
  <div className="component-notfound">
    <div className="container">
      {children}
    </div>
  </div>
);

NotFound.propTypes = {
  children: PropTypes.element.isRequired,
};

export default NotFound;
