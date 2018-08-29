import * as t from '../actions/types'

const initialState = {
    stocks: [],
    retrieveStocksSuccess: false,
    stockByBarcode: {},
    stockCategories:[],
    stockCategoriesSuccess:false  
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
        case t.RETRIEVE_STOCK_BY_BARCODE_REQUEST:
            return {
                ...state,
                retrieveStockByBarcodeSuccess: false,
            }
        case t.RETRIEVE_STOCK_BY_BARCODE_FAILURE:
            return {
                ...state,
                retrieveStockByBarcodeSuccess: false,
            }
            case t.RETRIEVE_STOCKS_CATEGORIES_SUCCESS:
            var a = action.payload.data;
            a.push('Hepsi');
            return {
                ...state,
                stockCategories: a,
                stockCategoriesSuccess:true
            }
            case t.RETRIEVE_STOCKS_CATEGORIES_REQUEST:
            return{
                ...state,
                stockCategoriesSuccess: false
            }
            case t.RETRIEVE_STOCKS_CATEGORIES_FAILURE:
            return{
                ...state,
                stockCategoriesSuccess: false
            }
        default:
            return {
                ...state
            }
    }

}
