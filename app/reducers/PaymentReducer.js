const initialState = {
    payments: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_PAYMENTS_SUCCESS':
            return { 
                ...state,
              payments: action.payload.data.items
            
            };
    default:
    return{
        ...state
    }
    }

}
