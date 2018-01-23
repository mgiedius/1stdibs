import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default
function shopReducer(state = initialState.shop, action) {
  switch (action.type) {
    case types.FETCH_PRODUCTS:
      return {
        ...state,
        products: {
          ...state.products,
          fetching: true,
          error: null,
        },
      };
    case types.FETCH_PRODUCTS_REJECTED:
      return {
        ...state,
        products: {
          ...state.products,
          fetching: false,
          error: action.payload,
        },
      };
    case types.FETCH_PRODUCTS_FULFILLED:
      return {
        ...state,
        products: {
          ...state.products,
          fetching: false,
          fetched: true,
          items: [...state.products.items, ...action.payload.items],
          isLoadMore: state.products.items.length + action.payload.items.length < action.payload.totalItems,
          totalItems: action.payload.totalItems,
        },
      };
    case types.FETCH_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          fetching: true,
          error: null,
        },
      };
    case types.FETCH_PRODUCT_REJECTED:
      return {
        ...state,
        product: {
          ...state.product,
          fetching: false,
          error: action.payload,
        },
      };
    case types.FETCH_PRODUCT_FULFILLED:
      return {
        ...state,
        product: {
          ...state.product,
          fetching: false,
          fetched: true,
          item: action.payload,
        },
      };
    case types.SET_PRODUCT:
      return {
        ...state,
        product: {
          ...state.product,
          fetching: false,
          fetched: true,
          error: null,
          item: action.payload,
        },
      };
    default:
      return state;
  }
}
