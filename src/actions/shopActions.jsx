import axios from 'axios';

import * as types from './actionTypes';

const API_ROOT = 'http://localhost:3001/';

function fetchProductsStart() {
  return {
    type: types.FETCH_PRODUCTS,
  };
}

function fetchProductsFulfilled(payload) {
  return {
    type: types.FETCH_PRODUCTS_FULFILLED,
    payload,
  };
}

function fetchProductsRejected(payload) {
  return {
    type: types.FETCH_PRODUCTS_REJECTED,
    payload,
  };
}

export function fetchProducts({ start = 0, limit = 9 } = {}) {
  return (dispatch) => {
    dispatch(fetchProductsStart());
    return axios.get(`${API_ROOT}browse?start=${start}&limit=${limit}`)
      .then(({ data }) => {
        dispatch(fetchProductsFulfilled(data));
      })
      .catch((response) => {
        dispatch(fetchProductsRejected('Something went wrong... Try again later.'));
        throw response;
      });
  };
}

function fetchProductStart() {
  return {
    type: types.FETCH_PRODUCT,
  };
}

function fetchProductFulfilled(payload) {
  return {
    type: types.FETCH_PRODUCT_FULFILLED,
    payload,
  };
}

function fetchProductRejected(payload) {
  return {
    type: types.FETCH_PRODUCT_REJECTED,
    payload,
  };
}

export function fetchProduct(id) {
  return (dispatch) => {
    dispatch(fetchProductStart());
    return axios.get(`${API_ROOT}item/${id}`)
      .then(({ data }) => {
        dispatch(fetchProductFulfilled(data));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          dispatch(fetchProductRejected('404 Page not found'));
        } else {
          dispatch(fetchProductRejected('Something went wrong... Try again later.'));
        }
        throw error;
      });
  };
}

export function setProduct(payload) {
  return dispatch => new Promise((resolve) => {
    resolve(dispatch({
      type: types.SET_PRODUCT,
      payload,
    }));
  });
}
