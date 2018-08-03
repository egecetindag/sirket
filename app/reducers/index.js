// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import ProductReducer from './ProductReducer';
import ClientReducer from './ClientReducer';
import DealerReducer from './DealerReducer';
import StockReducer from './StockReducer';

const rootReducer = combineReducers({
  productReducer: ProductReducer,
  clientReducer:ClientReducer,
  dealerReducer:DealerReducer,
  stockReducer:StockReducer,
});

export default rootReducer;
