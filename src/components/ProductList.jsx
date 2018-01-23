import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Favorite from './Favorite';

const ProductList = ({ link, product }) => (
  <div className="component-product-list col-sm-4 col-xs-12">
    <div className="bgcw">
      <Link to={link}>
        <img src={product.image} alt={product.title} className="responsive-img" />
      </Link>
      <div className="row info">
        <div className="price col-sm-8 col-xs-8">
          <Link to={link}>{product.price ? product.price.amounts.EUR : 'Price Upon request'}</Link>
        </div>
        <div className="col-sm-4 col-xs-4">
          <Favorite productId={product.id} />
        </div>
      </div>
    </div>
  </div>
);

ProductList.propTypes = {
  link: PropTypes.string.isRequired,
  product: PropTypes.shape({}).isRequired,
};

export default ProductList;
