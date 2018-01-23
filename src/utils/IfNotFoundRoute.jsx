import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../components/NotFound';

const IfNotFoundRoute =
  ({ component: Component, isNotFound, ...rest }) => (
    <Route
      {...rest}
      render={props => (
      isNotFound ?
        <NotFound>
          <h2>{isNotFound}</h2>
        </NotFound> :
        <Component {...props} />
    )}
    />
  );

IfNotFoundRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isNotFound: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
};

IfNotFoundRoute.defaultProps = {
  isNotFound: null,
};

export default IfNotFoundRoute;
