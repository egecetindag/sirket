import * as t from '../actions/types'
import { lang } from '../services/config'

const initialState = {
    stocks: [],
    retrieveStocksSuccess: false,
    stockByBarcode: {},
    stockCategories: [],
    stockCategoriesSuccess: false,
    stockForItem: undefined
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.RETRIEVE_STOCKS_SUCCESS:
            return {
                ...state,
                stocks: action.payload.data.items,
                retrieveStocksSuccess: true,
            };
        case t.RETRIEVE_STOCKS_REQUEST:
            return {
                ...state,
                retrieveStocksSuccess: false,
            };
        case t.RETRIEVE_STOCKS_FAILURE:
            return {
                ...state,
                retrieveStocksSuccess: false,
            };
        case t.RETRIEVE_STOCK_BY_BARCODE_SUCCESS:
            return {
                ...state,
                retrieveStockByBarcodeSuccess: true,
                stockByBarcode: action.payload.data.items[0]
            }
        case t.RETRIEVE_STOCK_FOR_ITEM_SUCCESS:
            return {
                ...state,
                stockForItem: action.payload.data.items[0]
            }
        case t.RETRIEVE_STOCK_BY_BARCODE_REQUEST:
            return {
                ...state,
                retrieveStockByBarcodeSuccess: false,
            }
        case t.DELETE_STOCK_FOR_ITEM_SUCCESS:
            return {
                ...state,
                stockForItem: undefined
            }
        case t.RETRIEVE_STOCK_BY_BARCODE_FAILURE:
            return {
                ...state,
                retrieveStockByBarcodeSuccess: false,
            }
        case t.RETRIEVE_STOCKS_CATEGORIES_SUCCESS:
            var a = []
            a.push(lang.favorite);
            action.payload.data.map(data => a.push(data))
            return {
                ...state,
                stockCategories: a,
                stockCategoriesSuccess: true
            }
        case t.RETRIEVE_STOCKS_CATEGORIES_REQUEST:
            return {
                ...state,
                stockCategoriesSuccess: false
            }
        case t.RETRIEVE_STOCKS_CATEGORIES_FAILURE:
            return {
                ...state,
                stockCategoriesSuccess: false
            }
        default:
            return {
                ...state
            }
    }

}
