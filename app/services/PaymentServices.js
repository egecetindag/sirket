const host ="http://localhost:8091"
import axios from 'axios'

export const retrievePaymentsService = (person,status) =>{
    return axios.get(host +`/getPayments?person=${person}&status=${status}&pageNumber=1&pageSize=10&orderBy=&orderAs=`)
}
export const createPaymentService = (dataToSend) =>{
    return axios.post(host+"/createPayment",dataToSend)
}
export const updatePaymentService = (dataToSend) =>{
    return axios.post(host+"/updatePayment",dataToSend)
}
export const deletePaymentService = (id) =>{
    return axios.get(host+`/deletePayments?ids=${id}`)
}
export const setPaymentStatus = (id,status) =>{
  return axios.get(host +`/setPaymentStatus?id=${id}&status=${status}`)
}
