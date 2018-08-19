import * as s from '../services/PaymentServices'
import axios from 'axios'
import * as t from './types' 
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrievePayments = (person,status) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.retrievePaymentsService(person,status))
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_PAYMENTS_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_PAYMENTS_FAILURE
            })
        }

    }
}
export const createPayment = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createPaymentService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_PAYMENT_SUCCESS
                });
                dispatch(retrievePayments(str,''));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_PAYMENT_FAILURE
            })
        }

    }
}
export const updatePayment = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updatePaymentService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_PAYMENT_SUCCESS
                });
                dispatch(retrievePayments(str,''));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_PAYMENT_FAILURE
            })
        }

    }
}
export const deletePayment = (id,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.deletePaymentService(id))           
            if (response.status === 200) {
                dispatch({
                    type: t.DELETE_PAYMENT_SUCCESS
                });
                dispatch(retrievePayments(str,''));
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.DELETE_PAYMENT_FAILURE
            })
        }

    }
}

export const setPaymentStatus = (idToUpdate,status) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.setPaymentStatus(idToUpdate,status))
      if (response.status === 200) {
        dispatch({
          type: t.SET_PAYMENT_STATUS_SUCCESS
        });
        dispatch(retrievePayments('',status));
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.SET_PAYMENT_STATUS_FAILURE
      })
    }

  }
}
