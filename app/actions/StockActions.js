import * as s from '../services/StockServices'
import axios from 'axios'
import * as t from './types'
//axios.defaults.adapter = require('axios/lib/adapters/http');

export const retrieveStocks = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(s.retrieveStocksService)
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_STOCKS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_STOCKS_FAILURE
            })
        }

    }
}
export const createStock = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createStockService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_STOCKS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_STOCKS_FAILURE
            })
        }

    }
}

export const editStock = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.editStockService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_STOCKS_SUCCESS
                })
                dispatch(retrieveStocks())
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_STOCKS_FAILURE
            })
        }

    }
}
