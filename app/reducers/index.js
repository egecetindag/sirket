// @flow
import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ClientReducer from './ClientReducer';
import DealerReducer from './DealerReducer';
import StockReducer from './StockReducer';
import ReceivingReducer from "./ReceivingReducer";
import PaymentReducer from "./PaymentReducer";

const rootReducer = combineReducers({
  productReducer: ProductReducer,
  clientReducer:ClientReducer,
  dealerReducer:DealerReducer,
  stockReducer:StockReducer,
  receivingReducer:ReceivingReducer,
  paymentReducer:PaymentReducer,
});

export default rootReducer;
