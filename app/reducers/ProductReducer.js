const initialState = {
    products: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_PRODUCTS_SUCCESS':
            return { 
                ...state,
                products: action.payload.data.items
            
            };
      // case 'RETRIEVE_PRODUCTS_FAILURE':
      //   return {
      //     ...state
      //   };
    default:
    return{
        ...state
    }
    }

}
