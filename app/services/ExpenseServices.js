import {pHost, host} from './config'
import axios from 'axios'

export const retrieveExpensesService = (str) =>{
  
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }
    return axios.get(pHost +`/getExpenses?name=${str}&description=&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createExpenseService = (dataToSend) =>{ 
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }   
    return axios.post(pHost+"/createExpense",dataToSend,config)
}
export const updateExpenseService = (dataToSend) =>{
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }   
    return axios.post(pHost+"/updateExpense",dataToSend,config)
}
export const deleteExpenseService = (id) =>{
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }
    return axios.get(pHost+`/deleteExpenses?ids=${id}`,config)
}

