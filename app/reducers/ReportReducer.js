const initialState = {
    dashboardSummaryReport: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'RETRIEVE_SUMMARY_DASHBOARD_REPORT_SUCCESS':
            return { 
                ...state,
              dashboardSummaryReport: action.payload.data
            
            };
    default:
    return{
        ...state
    }
    }

}
