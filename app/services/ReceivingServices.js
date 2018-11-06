import {pHost, host} from './config'
import axios from 'axios'

export const retrieveReceivingsService = (person, status) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/getReceivings?person=${person}&status=${status}&pageNumber=1&pageSize=10&orderBy=&orderAs=`, config)
}
export const createReceivingService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + "/createReceiving", dataToSend, config)
}
export const updateReceivingService = (dataToSend) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost + "/updateReceiving", dataToSend, config)
}
export const deleteReceivingService = (id) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/deleteReceivings?ids=${id}`, config)
}
export const setReceivingStatus = (id, status) => {
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost + `/setReceivingStatus?id=${id}&status=${status}`, config)
}
