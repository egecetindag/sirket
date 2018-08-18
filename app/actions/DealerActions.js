import * as s from '../services/DealerServices'
import axios from 'axios'
import * as t from './types'
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveDealers = (str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.retrieveDealersService(str))
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
export const createDealer = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createDealerService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_DEALER_SUCCESS
                });
               dispatch(retrieveDealers(str));
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
export const editDealer = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateDealerService(dataToSend))
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_DEALER_SUCCESS
                })
                dispatch(retrieveDealers(str))
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
export const deleteDealer = (id,str) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.deleteDealerService(id))
      if (response.status === 200) {
        dispatch({
          type: t.DELETE_DEALER_SUCCESS
        });
        dispatch(retrieveDealers(str));
      } else {
        throw Error
      }
    }
    catch (error) {
      dispatch({
        type: t.DELETE_DEALER_FAILURE
      })
    }

  }
}
