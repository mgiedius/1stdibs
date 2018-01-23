import initialState from './initialState';
import * as types from '../actions/actionTypes';

export default
function shopReducer(state = initialState.header, action) {
  switch (action.type) {
    case types.SET_HEADER:
      return {
        ...state,
        title: action.payload.title,
        isHomeLink: action.payload.isHomeLink,
      };
    case types.CLEAR_HEADER:
      return {
        ...state,
        title: '',
        isHomeLink: true,
      };
    default:
      return state;
  }
}
