// @flow
import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ClientReducer from './ClientReducer';
import DealerReducer from './DealerReducer';
import StockReducer from './StockReducer';
import ReceivingReducer from "./ReceivingReducer";
import PaymentReducer from "./PaymentReducer";
import ExpenseReducer from "./ExpenseReducer";
import AuthReducer from "./AuthReducer";
import ReportReducer from "./ReportReducer";

const rootReducer = combineReducers({
  productReducer: ProductReducer,
  clientReducer:ClientReducer,
  dealerReducer:DealerReducer,
  stockReducer:StockReducer,
  receivingReducer:ReceivingReducer,
  paymentReducer:PaymentReducer,
  expenseReducer:ExpenseReducer,
  authReducer: AuthReducer,
  reportReducer: ReportReducer,
});

export default rootReducer;
