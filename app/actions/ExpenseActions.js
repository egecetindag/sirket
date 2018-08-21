import * as s from '../services/ExpenseServices'
import axios from 'axios'
import * as t from './types' 
//axios.defaults.adapter = require('axios/lib/adapters/http');
export const retrieveExpenses = (str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.retrieveExpensesService(str))
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_EXPENSES_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_EXPENSES_FAILURE
            })
        }

    }
}
export const createExpense = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.createExpenseService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.CREATE_EXPENSE_SUCCESS
                });
                dispatch(retrieveExpenses(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.CREATE_EXPENSE_FAILURE
            })
        }

    }
}
export const updateExpense = (dataToSend,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.updateExpenseService(dataToSend))           
            if (response.status === 200) {
                dispatch({
                    type: t.EDIT_EXPENSE_SUCCESS
                });
                dispatch(retrieveExpenses(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.EDIT_EXPENSE_FAILURE
            })
        }

    }
}
export const deleteExpense = (id,str) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.deleteExpenseService(id))           
            if (response.status === 200) {
                dispatch({
                    type: t.DELETE_EXPENSE_SUCCESS
                });
                dispatch(retrieveExpenses(str));
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.DELETE_EXPENSE_FAILURE
            })
        }

    }
}

