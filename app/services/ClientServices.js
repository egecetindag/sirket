const host ="http://localhost:8091"
import axios from 'axios'

export const retrieveClientsService = () =>{
    return axios.get(host +"/getPeople?name=&pType=Müşteri&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=")
}
export const createClientService = (dataToSend) =>{
    return axios.post(host+"/createPerson",dataToSend)
}
