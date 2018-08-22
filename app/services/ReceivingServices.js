const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}
export const retrieveReceivingsService = (person,status) =>{
    return axios.get(host +`/getReceivings?person=${person}&status=${status}&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createReceivingService = (dataToSend) =>{
    return axios.post(host+"/createReceiving",dataToSend,config)
}
export const updateReceivingService = (dataToSend) =>{
    return axios.post(host+"/updateReceiving",dataToSend,config)
}
export const deleteReceivingService = (id) =>{
    return axios.get(host+`/deleteReceivings?ids=${id}`,config)
}
export const setReceivingStatus = (id,status) =>{
  return axios.get(host +`/setReceivingStatus?id=${id}&status=${status}`,config)
}
