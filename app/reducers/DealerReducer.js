import * as t from '../actions/types'

const initialState = {
    dealers: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.RETRIEVE_DEALERS_SUCCESS:
            return {
                ...state,
                dealers: action.payload.data.items

            };
    default:
    return{
        ...state
    }
    }

}
