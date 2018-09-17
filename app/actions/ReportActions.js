import * as s from '../services/ReportServices'
import * as t from './types'

export const retrieveSummaryDashboardReport = (first,last) => {
    return async (dispatch) => {
        try {
            let response = await dispatch(()=>s.getDailySummarySaleReportService(first,last))
            if (response.status === 200) {
                dispatch({
                    type: t.RETRIEVE_SUMMARY_DASHBOARD_REPORT_SUCCESS,
                    payload: response.data
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.RETRIEVE_SUMMARY_DASHBOARD_REPORT_FAILURE
            })
        }

    }
}

export const retrieveStockReport = (name,category) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.getCurrentStockReportService(name,category))
      if (response.status === 200) {
        dispatch({
          type: t.RETRIEVE_STOCK_REPORT_SUCCESS,
          payload: response.data
        })
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.RETRIEVE_STOCK_REPORT_FAILURE
      })
    }

  }
}

export const retrieveActivityLog = (first,last,userId) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.getActivityLog(first,last,userId))
      if (response.status === 200) {
        dispatch({
          type: t.RETRIEVE_ACTIVITY_LOG_SUCCESS,
          payload: response.data
        })
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.RETRIEVE_ACTIVITY_LOG_FAILURE
      })
    }

  }
}

export const retrievePaymentReport = (first,last) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.getPaymentReportService(first,last))
      if (response.status === 200) {
        dispatch({
          type: t.RETRIEVE_PAYMENT_REPORT_SUCCESS,
          payload: response.data
        })
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.RETRIEVE_PAYMENT_REPORT_FAILURE
      })
    }

  }
}

export const retrieveProductReport = (first,last,name,category) => {
  return async (dispatch) => {
    try {
      let response = await dispatch(()=>s.getProductReportService(first,last,name,category))
      if (response.status === 200) {
        dispatch({
          type: t.RETRIEVE_PRODUCT_REPORT_SUCCESS,
          payload: response.data
        })
      } else {
        throw Error
      }
    }
    catch (error) {
      console.log('error', error)
      dispatch({
        type: t.RETRIEVE_PRODUCT_REPORT_FAILURE
      })
    }

  }
}
