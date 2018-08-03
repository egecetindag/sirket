import * as s from '../services/DealerServices'
import axios from 'axios'
import * as t from './types'
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveDealers = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(s.retrieveDealersService)
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_DEALERS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_DEALERS_FAILURE
            })
        }

    }
}
export const createDealer = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createDealerService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_DEALER_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_DEALER_FAILURE
            })
        }

    }
}
export const editDealer = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.editDealerService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_DEALER_SUCCESS
                })
                dispatch(retrieveDealers())
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_DEALER_FAILURE
            })
        }

    }
}
