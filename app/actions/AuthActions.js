import * as a from '../services/AuthServices'
import * as t from './types'


export const login = (dataToSend) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: t.LOGIN_REQUEST
            })
            let response = await dispatch(()=>a.loginService(dataToSend))
            if (response.status === 200) {
                localStorage.setItem('userToken', response.data)
                dispatch({
                    type: t.LOGIN_SUCCESS,
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            console.log('error', error)
            dispatch({
                type: t.LOGIN_FAILURE
            })
        }

    }
}
export const logout = () => {
    return async (dispatch) => {
        localStorage.removeItem('userToken')
       dispatch({
        type: t.LOGOUT_SUCCESS
       })
}
}