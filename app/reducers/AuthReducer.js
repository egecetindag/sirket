import * as t from '../actions/types'

const initialState = {
    loginRequest: false,
    loginSuccess: false,
    loginCheckSuccess: 'loading',
    user: {}
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
            case t.LOGIN_CHECK_REQUEST:
            return {
                ...state,
                loginRequest: true,
                loginSuccess: false,

            };
        case t.LOGIN_CHECK_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loginCheckSuccess: true,

            };
        case t.LOGIN_CHECK_FAILURE:
            return {
                ...state,
                loginSuccess: false,
                loginRequest:false ,
                loginCheckSuccess:false                
            };
            case t.LOGOUT_SUCCESS:
            return {
                ...state,
                loginSuccess: false,
                loginRequest:false ,
                loginCheckSuccess:false
            };
        default:
            return {
                ...state
            }
    }

}
