const host ="http://localhost:8091"
import axios from 'axios'


export const retrieveStocksService = (name) =>{
    return axios.get(host +`/getStocks?barcode=&name=${name}&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`)
}
export const retrieveStockByBarcodeService = (barcode) =>{
  return axios.get(host +`/getStocks?barcode=${barcode}&name=&description=&category=&pageNumber=1&pageSize=10&orderBy=&orderAs=`)
}
export const createStockService = (dataToSend) =>{
    return axios.post(host+"/createStock",dataToSend)
}
export const updateStockService = (dataToSend) =>{
    return axios.post(host+"/updateStock",dataToSend)
}
export const deleteStockService = (id) =>{
  return axios.get(host+`/deleteStocks?ids=${id}`)
}
