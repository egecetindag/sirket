// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import ProductReducer from './ProductReducer'

const rootReducer = combineReducers({
  productReducer: ProductReducer
});

export default rootReducer;
