const host ="http://localhost:8091"
import axios from 'axios'

export const loginService = (dataToSend) =>{
    return axios.post(host +`/login`, dataToSend)
}