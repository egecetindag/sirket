import * as a from '../services/AuthServices'
import * as t from './types'
import { message } from 'antd'


export const login = (dataToSend) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: t.LOGIN_REQUEST
            })
            let response = await dispatch(() => a.loginService(dataToSend))
            if (response.data.data) {
                localStorage.setItem('userToken', response.data.data.token)
                dispatch({
                    type: t.LOGIN_SUCCESS,
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            message.error('Lutfen kullanici adi ve sifrenizi kontrol edin')
            dispatch({
                type: t.LOGIN_FAILURE
            })
        }

    }
}
export const loginCheck = () => {
    return async (dispatch) => {
        try {
            dispatch({
                type: t.LOGIN_CHECK_REQUEST
            })
            let response = await dispatch(() => a.loginCheckService())
            if (response.status === 200) {
                dispatch({
                    type: t.LOGIN_CHECK_SUCCESS,
                })
            } else {
                throw Error
            }
        }
        catch (error) {
            dispatch({
                type: t.LOGIN_CHECK_FAILURE
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