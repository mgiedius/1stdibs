import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as shopActions from '../../actions/shopActions';
import * as headerActions from '../../actions/headerActions';
import ProductList from '../../components/ProductList';

class ProductsList extends Component {
  constructor(...args) {
    super(...args);

    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  componentDidMount() {
    this.props.headerActions.setHeader({ title: 'Browse page', isHomeLink: false });

    if (!this.props.products.fetched) {
      this.props.shopActions.fetchProducts();
    }
  }

  handleLoadMore() {
    const { products } = this.props;
    if (products.isLoadMore) {
      this.props.shopActions.fetchProducts({ start: products.items.length });
    }
  }

  render() {
    const { products } = this.props;

    return (
      <div className="container-products-list">
        <div className="container">
          <div className="row">
            {products.items.length !== 0 && products.items.map(product => (
              <ProductList
                key={product.id}
                link={`/products/${product.id}`}
                product={product}
              />
            ))}
          </div>
          {products.isLoadMore &&
            <div className="loadmore-wrapper">
              <button className="btn btn-rouded" onClick={this.handleLoadMore}>Load more</button>
            </div>}
        </div>
      </div>
    );
  }
}

ProductsList.propTypes = {
  shopActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  headerActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  products: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    products: state.shop.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shopActions: bindActionCreators(shopActions, dispatch),
    headerActions: bindActionCreators(headerActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProductsList);
