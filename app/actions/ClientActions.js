import * as s from '../services/ClientServices'
import axios from 'axios'
import * as t from './types'
import { retrieveProducts } from "./ProductActions";
//axios.defaults.adapter = require('axios/lib/adapters/http');

export const retrieveClients = (str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.retrieveClientsService(str))
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
export const createClient = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createClientService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_CLIENTS_SUCCESS
                })
                dispatch(retrieveClients(str));
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
export const updateClient = (dataToSend,str) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.updateClientService(dataToSend))
      if (response.status === 200) {
        dispatch({
          type: t.EDIT_CLIENTS_SUCCESS
        });
        dispatch(retrieveClients(str));
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.EDIT_CLIENTS_FAILURE
      })
    }

  }
}
export const deleteClient = (id,str) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.deleteClientService(id))
      if (response.status === 200) {
        dispatch({
          type: t.DELETE_CLIENTS_SUCCESS
        });
        dispatch(retrieveClients(str));
      } else {
        throw Error
      }
    }
    catch (error) {
      dispatch({
        type: t.DELETE_CLIENTS_FAILURE
      })
    }

  }
}
