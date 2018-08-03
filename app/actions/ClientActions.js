import * as s from '../services/ClientServices'
import axios from 'axios'
import * as t from './types'
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveClients = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(s.retrieveClientsService)
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_CLIENTS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_CLIENTS_FAILURE
            })
        }

    }
}
export const createClient = (dataToSend) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createClientService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_CLIENTS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_CLIENTS_FAILURE
            })
        }

    }
}
