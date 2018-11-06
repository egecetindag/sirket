import {pHost, host} from './config'
import axios from 'axios'

export const retrievePaymentsService = (person,status) =>{
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost +`/getPayments?person=${person}&status=${status}&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createPaymentService = (dataToSend) =>{
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost+"/createPayment",dataToSend,config)
}
export const updatePaymentService = (dataToSend) =>{
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.post(pHost+"/updatePayment",dataToSend,config)
}
export const deletePaymentService = (id) =>{
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
    return axios.get(pHost+`/deletePayments?ids=${id}`,config)
}
export const setPaymentStatus = (id,status) =>{
    const config = { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('userToken') } }
  return axios.get(pHost +`/setPaymentStatus?id=${id}&status=${status}`,config)
}
