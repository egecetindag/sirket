import * as t from '../actions/types'

const initialState = {
    dashboardSummaryReport: [],
    stockReport:[],
    stockReportTotal:{},
    activityLog:[]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.RETRIEVE_SUMMARY_DASHBOARD_REPORT_SUCCESS:
            return { 
                ...state,
              dashboardSummaryReport: action.payload.data
            
            };
        case t.RETRIEVE_STOCK_REPORT_SUCCESS:
            //console.log("reducer: ", action.payload.data.items)
            return{
              ...state,
              stockReport: action.payload.data.items,
              stockReportTotal: action.payload.data.total
            };
      case t.RETRIEVE_ACTIVITY_LOG_SUCCESS:
            return{
              ...state,
              activityLog: action.payload.data.items
            }
    default:
    return{
        ...state
    }
    }

}
