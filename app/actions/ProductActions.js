import * as s from '../services/ProductServices'
import axios from 'axios'
import * as t from './types' 
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveProducts = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(s.retrieveProductsService)           
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
export const createProduct = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createProductService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_PRODUCT_SUCCESS
                });
                dispatch(retrieveProducts());
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_PRODUCT_SUCCESS
            })
        }

    }
}
export const updateProduct = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateProductService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_PRODUCT_SUCCESS
                });
                dispatch(retrieveProducts());
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_PRODUCT_SUCCESS
            })
        }

    }
}
export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.deleteProductService(id))           
            if (response.status === 200) {
                dispatch({
                    type: t.DELETE_PRODUCT_SUCCESS
                });
                dispatch(retrieveProducts());
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.DELETE_PRODUCT_SUCCESS
            })
        }

    }
}
