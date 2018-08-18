const initialState = {
    products: [],
    product: {},
    getProductRequest: false,
    getProductSuccess: false,
    getProductsSuccess: false,
    getProductsRequest: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_PRODUCTS_SUCCESS':
            return {
                ...state,
                products: action.payload.data.items,
                getProductsSuccess: true,

            };
        case 'RETRIEVE_PRODUCTS_REQUEST':
            return {
                ...state,
                getProductsSuccess: false,
                getProductsRequest: true,
                
            };
        case 'RETRIEVE_PRODUCTS_FAILURE':
            return {
                getProductsSuccess: false,
                getProductsRequest: false,
                ...state
            };
        case 'RETRIEVE_PRODUCT_SUCCESS':
            return {
                ...state,
                product: action.payload,
                getProductSuccess: true,
                getProductRequest: false,

            };
        case 'RETRIEVE_PRODUCT_FAILURE':
            return {
                ...state,
                getProductSuccess: false,
                getProductRequest: false,


            };
        case 'RETRIEVE_PRODUCT_REQUEST':
            return {
                ...state,
                getProductRequest: true,
                getProductSuccess: false,

            };
        default:
            return {
                ...state
            }
    }

}
