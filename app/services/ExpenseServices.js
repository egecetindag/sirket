const host ="http://localhost:8091"
import axios from 'axios'

export const retrieveExpensesService = (str) =>{
    return axios.get(host +`/getExpenses?name=${str}&description=&pageNumber=1&pageSize=10&orderBy=&orderAs=`)
}
export const createExpenseService = (dataToSend) =>{
    return axios.post(host+"/createExpense",dataToSend)
}
export const updateExpenseService = (dataToSend) =>{
    return axios.post(host+"/updateExpense",dataToSend)
}
export const deleteExpenseService = (id) =>{
    return axios.get(host+`/deleteExpenses?ids=${id}`)
}

