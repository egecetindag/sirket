const host ="http://localhost:8091/api"
import axios from 'axios'
const token = localStorage.getItem('userToken')
const config = {
  headers: {
  'Authorization': 'Bearer ' + token
}
}
export const retrieveExpensesService = (str) =>{
    return axios.get(host +`/getExpenses?name=${str}&description=&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createExpenseService = (dataToSend) =>{
    return axios.post(host+"/createExpense",dataToSend,config)
}
export const updateExpenseService = (dataToSend) =>{
    return axios.post(host+"/updateExpense",dataToSend,config)
}
export const deleteExpenseService = (id) =>{
    return axios.get(host+`/deleteExpenses?ids=${id}`,config)
}

