const host = "http://localhost:8091"
const pHost = "http://localhost:8091/api"
import axios from 'axios'

export const loginService = (dataToSend) => {

    return axios.post(host + `/login`, dataToSend)
}
export const loginCheckService = () => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }

    return axios.get(pHost + `/me`, config)
}