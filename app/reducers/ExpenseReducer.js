const initialState = {
    expenses: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_EXPENSES_SUCCESS':
            return { 
                ...state,
              expenses: action.payload.data.items
            
            };
    default:
    return{
        ...state
    }
    }

}
