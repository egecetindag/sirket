const host = "http://localhost:8091/api"

import axios from 'axios'

export const retrieveClientsService = (name) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/getPeople?name=${name}&pType=Müşteri&pageNumber=1&pageSize=10&orderBy=&orderAs=&isDropdown=`, config)
}
export const createClientService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(host + "/createPerson", dataToSend, config)
}
export const updateClientService = (dataToSend) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.post(host + "/updatePerson", dataToSend, config)
}
export const deleteClientService = (id) => {
  const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(host + `/deletePeople?ids=${id}`, config)
}
