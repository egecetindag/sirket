const host ="http://localhost:8091/api"
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}
import axios from 'axios'

export const retrieveClientsService = (name) =>{
    return axios.get(host +`/getPeople?name=${name}&pType=Müşteri&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=`, config)
}
export const createClientService = (dataToSend) =>{
    return axios.post(host+"/createPerson",dataToSend,config)
}
export const updateClientService = (dataToSend) =>{
  return axios.post(host+"/updatePerson",dataToSend,config)
}
export const deleteClientService = (id) =>{
  return axios.get(host+`/deletePeople?ids=${id}`,config)
}
