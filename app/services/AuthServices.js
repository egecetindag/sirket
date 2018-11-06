import {pHost, host} from './config'
import axios from 'axios'

export const loginService = (dataToSend) => {

    return axios.post(host + `/login`, dataToSend)
}
export const loginCheckService = () => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }

    return axios.get(pHost + `/me`, config)
}