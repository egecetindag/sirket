const host ="http://localhost:8091"
const pHost ="http://localhost:8091/api"
const token = localStorage.getItem('userToken')
import axios from 'axios'

export const loginService = (dataToSend) =>{
    return axios.post(host +`/login`, dataToSend)
}
export const loginCheckService = () =>{
    return axios.get(pHost +`/me`,{headers: {
        'Authorization': 'Bearer ' + token
    }
      })
}