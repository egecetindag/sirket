import * as s from '../services/ProductServices'
import axios from 'axios'
import * as t from './types' 
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveProducts = (str) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: t.RETRIEVE_PRODUCTS_REQUEST,
            })
            let response = await dispatch(()=>s.retrieveProductsService(str))           
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_PRODUCTS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_PRODUCTS_FAILURE
            })
        }

    }
}

export const retrieveProduct = (id) => {
    return async (dispatch) => {
        dispatch({
            type: t.RETRIEVE_PRODUCT_REQUEST,
        })
        try {
            let response = await dispatch(()=>s.retrieveProductService(id))           
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_PRODUCT_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.RETRIEVE_PRODUCT_FAILURE
            })
        }

    }
}

export const createProduct = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createProductService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_PRODUCT_SUCCESS
                });
                dispatch(retrieveProducts(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_PRODUCT_FAILURE
            })
        }

    }
}
export const updateProduct = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateProductService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_PRODUCT_SUCCESS
                });
                dispatch(retrieveProducts(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_PRODUCT_FAILURE
            })
        }

    }
}
export const deleteProduct = (id,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.deleteProductService(id))           
            if (response.status === 200) {
                dispatch({
                    type: t.DELETE_PRODUCT_SUCCESS
                });
                dispatch(retrieveProducts(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.DELETE_PRODUCT_FAILURE
            })
        }

    }
}
