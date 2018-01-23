import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import IfNotFoundRoute from './utils/IfNotFoundRoute';

import ProductsList from './containers/Products/ProductsList';
import ProductsSingle from './containers/Products/ProductsSingle';
import Header from './components/Header';
import NotFound from './components/NotFound';

const Routes = ({ products, product }) => (
  <BrowserRouter>
    <Fragment>
      <Header />

      <Switch>
        <Redirect exact from="/" to="/products" />

        <IfNotFoundRoute
          exact
          path="/products/:id"
          component={ProductsSingle}
          isNotFound={product.error}
        />
        <IfNotFoundRoute
          exact
          path="/products"
          component={ProductsList}
          isNotFound={products.error}
        />

        <Route component={() => (
          <NotFound>
            <h2>404 Page not found</h2>
          </NotFound>
        )}
        />
      </Switch>
    </Fragment>
  </BrowserRouter>
);

Routes.propTypes = {
  products: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  product: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    products: state.shop.products,
    product: state.shop.product,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Routes);
