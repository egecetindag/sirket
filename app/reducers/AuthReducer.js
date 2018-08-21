import * as t from '../actions/types'

const initialState = {
    loginRequest: false,
    loginSuccess: false,
    loginCheckSuccess: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.LOGIN_REQUEST:
            return {
                ...state,
                loginRequest: true,
                loginSuccess: false,

            };
        case t.LOGIN_SUCCESS:
            return {
                ...state,
                loginRequest: false,
                loginSuccess: true,
                loginCheckSuccess: true

            };
        case t.LOGIN_FAILURE:
            return {
                ...state,
                loginSuccess: false,
                loginRequest:false ,
            };
        default:
            return {
                ...state
            }
    }

}
