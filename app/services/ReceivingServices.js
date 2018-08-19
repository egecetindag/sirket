const host ="http://localhost:8091"
import axios from 'axios'

export const retrieveReceivingsService = (person,status) =>{
    return axios.get(host +`/getReceivings?person=${person}&status=${status}&pageNumber=1&pageSize=10&orderBy=&orderAs=`)
}
export const createReceivingService = (dataToSend) =>{
    return axios.post(host+"/createReceiving",dataToSend)
}
export const updateReceivingService = (dataToSend) =>{
    return axios.post(host+"/updateReceiving",dataToSend)
}
export const deleteReceivingService = (id) =>{
    return axios.get(host+`/deleteReceivings?ids=${id}`)
}
export const setReceivingStatus = (id,status) =>{
  return axios.get(host +`/setReceivingStatus?id=${id}&status=${status}`)
}
