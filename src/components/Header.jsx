import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Header = ({ header }) => (
  <div className="component-header">
    <div className="container">
      {header.isHomeLink &&
        <Link className="homelink" to="/products">
          <span />Home
        </Link>}
      <h1>{header.title}</h1>
    </div>
  </div>
);

Header.propTypes = {
  header: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    header: state.header,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Header);
