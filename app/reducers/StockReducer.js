import * as t from '../actions/types'

const initialState = {
    stocks: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.RETRIEVE_STOCKS_SUCCESS:
            return {
                ...state,
                stocks: action.payload.data.items

            };
    default:
    return{
        ...state
    }
    }

}
