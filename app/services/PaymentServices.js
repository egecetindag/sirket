const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}
export const retrievePaymentsService = (person,status) =>{
    return axios.get(host +`/getPayments?person=${person}&status=${status}&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createPaymentService = (dataToSend) =>{
    return axios.post(host+"/createPayment",dataToSend,config)
}
export const updatePaymentService = (dataToSend) =>{
    return axios.post(host+"/updatePayment",dataToSend,config)
}
export const deletePaymentService = (id) =>{
    return axios.get(host+`/deletePayments?ids=${id}`,config)
}
export const setPaymentStatus = (id,status) =>{
  return axios.get(host +`/setPaymentStatus?id=${id}&status=${status}`,config)
}
