import * as s from '../services/ReceivingServices'
import axios from 'axios'
import * as t from './types' 
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveReceivings = (person,status) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.retrieveReceivingsService(person,status))
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_RECEIVINGS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_RECEIVINGS_FAILURE
            })
        }

    }
}
export const createReceiving = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createReceivingService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_RECEIVING_SUCCESS
                });
                dispatch(retrieveReceivings(str,''));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_RECEIVING_FAILURE
            })
        }

    }
}
export const updateReceiving = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateReceivingService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_RECEIVING_SUCCESS
                });
                dispatch(retrieveReceivings(str,''));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_RECEIVING_FAILURE
            })
        }

    }
}
export const deleteReceiving = (id,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.deleteReceivingService(id))           
            if (response.status === 200) {
                dispatch({
                    type: t.DELETE_RECEIVING_SUCCESS
                });
                dispatch(retrieveReceivings(str,''));
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.DELETE_RECEIVING_FAILURE
            })
        }

    }
}

export const setReceivingStatus = (idToUpdate,status) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.setReceivingStatus(idToUpdate,status))
      if (response.status === 200) {
        dispatch({
          type: t.SET_RECEIVING_STATUS_SUCCESS
        });
        dispatch(retrieveReceivings('',status));
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.SET_RECEIVING_STATUS_FAILURE
      })
    }

  }
}
