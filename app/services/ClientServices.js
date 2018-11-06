import {pHost, host} from './config'

import axios from 'axios'

export const retrieveClientsService = (name) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/getPeople?name=${name}&pType=Müşteri&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=`, config)
}
export const createClientService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(pHost + "/createPerson", dataToSend, config)
}
export const updateClientService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(pHost + "/updatePerson", dataToSend, config)
}
export const deleteClientService = (id) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost + `/deletePeople?ids=${id}`, config)
}
