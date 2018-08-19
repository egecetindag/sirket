import * as t from '../actions/types'

const initialState = {
    stocks: [],
    retrieveStocksSuccess:false,
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
        default:
            return {
                ...state
            }
    }

}
