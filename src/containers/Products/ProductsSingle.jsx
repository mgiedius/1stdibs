import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as shopActions from '../../actions/shopActions';
import * as headerActions from '../../actions/headerActions';
import Favorite from '../../components/Favorite';

class ProductsSingle extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      loaded: false,
    };

    this.handlePurchase = this.handlePurchase.bind(this);
    this.handleMakeOffer = this.handleMakeOffer.bind(this);
  }

  componentDidMount() {
    // If user clicked back button
    if (this.props.product.item.id !== this.props.match.params.id) {
      const product = this.props.products.items
        .find(item => item.id === this.props.match.params.id);

      // If product already loaded
      if (product) {
        this.props.shopActions.setProduct(product).then(() => {
          this.pageLoaded();
        });
      } else {
        this.props.shopActions.fetchProduct(this.props.match.params.id)
          .then(() => {
            this.pageLoaded();
          });
      }
    } else {
      this.pageLoaded();
    }
  }

  pageLoaded() {
    this.props.headerActions.setHeader({
      title: this.props.product.error || this.props.product.item.seller.company,
      isHomeLink: true,
    });
    this.setState({ loaded: true });
  }

  handleMakeOffer() {
    alert('Successfully made an offer!');
  }

  handlePurchase() {
    alert('Successfully bought!');
  }

  render() {
    const { product } = this.props;

    return (
      <div className="container-product-single">
        {this.state.loaded &&
          <div className="container">
            <div className="row">
              <div className=" product-image col-sm-4 col-xs-12">
                <Favorite productId={product.item.id} />
                <div className="bgcw">
                  <img
                    src={product.item.image}
                    alt={product.item.title}
                    className="responsive-img"
                  />
                </div>
              </div>
              <div className="col-sm-8 col-xs-12">
                <div className="row">
                  <div className="bgcw product-info col-sm-12 col-xs-12">
                    <h2>{product.item.title}</h2>
                    <p className="price">{product.item.price ? product.item.price.amounts.EUR : 'Price Upon request'}</p>
                    <h3>Measurements:</h3>
                    <p>{product.item.measurements.display}</p>
                    <div className="action-buttons">
                      <button className="btn" onClick={this.handlePurchase}>Purchase</button>
                      <button className="btn" onClick={this.handleMakeOffer}>Make offer</button>
                    </div>
                  </div>
                  <div className="bgcw description col-sm-12 col-xs-12">
                    <p>{product.item.description}</p>
                    {product.item.creators &&
                      <p className="creators"><strong>Creator:</strong> {product.item.creators}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

ProductsSingle.propTypes = {
  products: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  product: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  shopActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  headerActions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return {
    products: state.shop.products,
    product: state.shop.product,
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
)(ProductsSingle);
