import * as types from './actionTypes';

export function setHeader(payload) {
  return (dispatch) => {
    dispatch({
      type: types.SET_HEADER,
      payload,
    });
  };
}

export function clearHeader() {
  return (dispatch) => {
    dispatch({
      type: types.CLEAR_HEADER,
    });
  };
}
