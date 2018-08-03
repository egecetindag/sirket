const initialState = {
    clients: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_CLIENTS_SUCCESS':
            return {
                ...state,
                clients: action.payload.data.items

            };
    default:
    return{
        ...state
    }
    }

}
