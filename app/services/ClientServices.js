const host ="http://localhost:8091"
import axios from 'axios'

export const retrieveClientsService = (name) =>{
    return axios.get(host +`/api/getPeople?name=${name}&pType=Müşteri&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=`)
}
export const createClientService = (dataToSend) =>{
    return axios.post(host+"/createPerson",dataToSend)
}
export const updateClientService = (dataToSend) =>{
  return axios.post(host+"/updatePerson",dataToSend)
}
export const deleteClientService = (id) =>{
  return axios.get(host+`/deletePeople?ids=${id}`)
}
