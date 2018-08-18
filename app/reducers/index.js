// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import ProductReducer from './ProductReducer';
import ClientReducer from './ClientReducer';
import DealerReducer from './DealerReducer';
import StockReducer from './StockReducer';
import ReceivingReducer from "./ReceivingReducer";

const rootReducer = combineReducers({
  productReducer: ProductReducer,
  clientReducer:ClientReducer,
  dealerReducer:DealerReducer,
  stockReducer:StockReducer,
  receivingReducer:ReceivingReducer,
});

export default rootReducer;
