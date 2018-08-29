const host ="http://localhost:8091/api"
import axios from 'axios'

export const retrieveExpensesService = (str) =>{
  
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }
    return axios.get(host +`/getExpenses?name=${str}&description=&pageNumber=1&pageSize=10&orderBy=&orderAs=`,config)
}
export const createExpenseService = (dataToSend) =>{ 
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }   
    return axios.post(host+"/createExpense",dataToSend,config)
}
export const updateExpenseService = (dataToSend) =>{
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }   
    return axios.post(host+"/updateExpense",dataToSend,config)
}
export const deleteExpenseService = (id) =>{
    const config = {
        headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('userToken')
      }
      }
    return axios.get(host+`/deleteExpenses?ids=${id}`,config)
}

