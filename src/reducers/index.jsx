import { combineReducers } from 'redux';

import shop from './shopReducer';
import header from './headerReducer';

export default combineReducers({
  shop,
  header,
});
