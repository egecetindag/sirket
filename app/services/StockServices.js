const host ="http://localhost:8091"
import axios from 'axios'


export const retrieveStocksService = () =>{
    return axios.get(host +"/getStocks?barcode=&name=gofret&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=")
}
export const createStockService = (dataToSend) =>{
    return axios.post(host+"/createStock",dataToSend)
}
export const editStockService = (dataToSend) =>{
    return axios.post(host+"/updateStock",dataToSend)
}
