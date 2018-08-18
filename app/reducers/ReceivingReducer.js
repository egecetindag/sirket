const initialState = {
    receivings: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_RECEIVINGS_SUCCESS':
            return { 
                ...state,
              receivings: action.payload.data.items
            
            };
    default:
    return{
        ...state
    }
    }

}
